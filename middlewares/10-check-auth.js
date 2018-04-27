const {api, client} = require('../config');
const {apiPath, index} = require('../router');
const {get} = require('lodash');
const clients = require('../lib/socket-io/clients');

const forbiddenMap = {
	'patch': true,
	'delete': true
};

const map = {};
map[`${apiPath('login')}::POST`] = true;
map[`${apiPath('reg')}::POST`] = true;
map[`${apiPath('logout')}::POST`] = true;
map[`${apiPath('verifying')}::POST`] = true;
map[`/verifying::GET`] = true;


exports.init = app => app.use(async (ctx, next) => {
	let {path, method} = ctx;
	let user = get(ctx, 'session.passport.user', {});

	clients.addClient(user);

	let rights = user.role !== undefined ? user.role : 1;
	let verify = user.verify !== undefined ? user.verify : 0;

	if(map[`${path}::${method.toUpperCase()}`]){
		return next();
	}

	if(!process.env.TESTING && !ctx.isAuthenticated()){
		ctx.throw(401);
	}

	if(ctx.method === 'GET' && !ctx.headers[client.headers['get-api'][0]]){
		ctx.status = 200;
		ctx.type = 'text/html';
		ctx.body = index;
		return;
	}

	if(!process.env.TESTING && !verify && method !== 'GET'){
		ctx.status = 400;
		ctx.body = {status: 'not verifyed'};
		return;
	}

	if(!process.env.TESTING && rights && forbiddenMap[method.toLowerCase()]){
		ctx.status = 403;
		ctx.body = {status: 'forbidden'};
		return;
	}



	await next();

	const status = ctx.status || 404;
	if(status === 404){
		ctx.throw(404);
	}

});
