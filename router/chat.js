const {router, apiPath} = require('./index');
const {client: rClient} = require('../lib/redis');
const {paths, io, limits} = require('../config');
const fs = require('fs');
const path = require('path');
const {get} = require('lodash');
const asyncRead = require('await-stream-ready').read;
const asyncWrite = require('await-stream-ready').write;
const sharp = require('sharp');
let imgTrans = sharp().resize(limits.minImgWidth, limits.minImgWidth).max();

let mkdir = require('../lib/tools/mkdir-r');
let IO = require('../lib/socket-io');
let {getDate} = require('../lib/tools/formatDate');

router.get(apiPath('chat'), async(ctx, next) => {
	var messages = await new Promise((res, rej)=>{
		rClient.lrange('chat-history', 0, 99, (err, reply) => {
			if (!err) {
				var result = [];

				for (var msg in reply){
				  result.push(JSON.parse(reply[msg]));
				}
				return res(result);

			} else {
				ctx.throw(500);
			}
		});
	});

	ctx.body = messages;
});

router.post(apiPath('chat'), async(ctx, next) => {
	const files = ctx.request.body.files;
	const fields = ctx.request.body.fields;
	if(!files || !fields){ctx.throw(400)}

	let {file} = files;
	let {name} = fields;
	let user = get(ctx, 'session.passport.user', {});
	if(!file || !name){ctx.throw(400)}
	if(!user.login){ctx.throw(401)}
	if(file.size >= limits.chatFile){ctx.throw({status: 400, msg: 'Размер файла превышает 1Гб'});}

	mkdir(`${paths.static}/${paths.assetsChat}/${user.login}`);

	var type = 'file';
	var modify = {};

	let ext = file.name.match(/\..{2,4}$/g)[0];
	let fileP = path.join(`${paths.assetsChat}/${user.login}`, Math.random().toString(36).substr(2, 25));
	let filePath = fileP + ext;
	let filePathFull = path.join(process.cwd(), paths.static, filePath);
	let rStream = fs.createReadStream(file.path);
	let wStream = fs.createWriteStream(filePathFull);
	await asyncWrite(rStream.pipe(wStream));

	if(file.type.match(/image/g)){
		let filePathMin = fileP + '.min' + ext;
		let filePathMinFull = path.join(process.cwd(), paths.static, filePathMin);
		await sharp(filePathFull).resize(limits.minImgWidth, limits.minImgWidth).max().toFile(filePathMinFull);
		type = 'image';
		modify.min = filePathMin.replace(/\\/g, '/');
	}

	let upMsg = Object.assign({},
		{
			name,
			msg: filePath.replace(/\\/g, '/'),
			type,
		},
		modify,
		getDate()
	);

	rClient.rpush('chat-history', JSON.stringify(upMsg));
	rClient.ltrim('chat-history', 0, 99);

	IO.sio.sockets.emit(io['chat:message'], upMsg);

	ctx.body = {status: 'file loaded'};
});
