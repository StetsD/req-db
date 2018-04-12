const {router, apiPath} = require('./index');
const {client: rClient} = require('../lib/redis');
const fs = require('fs');
const os = require('os');
const path = require('path');
const filetype = require('file-type');

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
	const file = ctx.request.body.files.megafile;
	const rStream = fs.createReadStream(file.path);
	const wStream = fs.createWriteStream(path.join(os.tmpdir(), Math.random().toString() + file.name.match(/\..{2,4}$/g)[0]));
	rStream.pipe(wStream);
	console.log('UPLOADED ', file.name.match(/\..{2,4}$/g)[0], wStream.path);
	ctx.body = {status: 'file loaded'};
});
