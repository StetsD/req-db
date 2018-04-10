const {api} = require('../config');
const {apiPath, index} = require('../router');
const {get} = require('lodash');

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
	let rights = get(ctx, 'session.passport.user.role', 1);
	let verify = get(ctx, 'session.passport.user.verify', 0);
	
	if(map[`${path}::${method.toUpperCase()}`]){
		return next();
	}

	if(ctx.method === 'GET' && !ctx.headers['data-type']){
		ctx.status = 200;
		ctx.type = 'text/html';
		ctx.body = index;
		return;
	}

	if(!verify && method !== 'GET'){
		ctx.status = 400;
		ctx.body = {status: 'not verifyed'};
		return;
	}

	if(rights && forbiddenMap[method.toLowerCase()]){
		ctx.status = 403;
		ctx.body = {status: 'forbidden'};
		return;
	}

	try{
		// if(!ctx.isAuthenticated()){
		// 	ctx.throw(401);
		// }

		await next();

		const status = ctx.status || 404;
		if(status === 404){
			ctx.throw(404);
		}

	}catch(err){
		ctx.status = err.status || 500;

		switch(ctx.status){
			case 401:
				ctx.body = 'unauthorized';
				break;
			case 404:
				ctx.body = 'Not found';
				break;
			default:
				ctx.body = err;
				break;
		}
	}


});
