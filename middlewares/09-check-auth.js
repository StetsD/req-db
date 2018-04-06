const {api} = require('../config');
const {apiPath, index} = require('../router');

const map = {};
map[`${apiPath('login')}::POST`] = true;
map[`${apiPath('reg')}::POST`] = true;
map[`/verifying::GET`] = true;


exports.init = app => app.use(async (ctx, next) => {
	let {path, method} = ctx;

	if(map[`${path}::${method.toUpperCase()}`]){
		return next();
	}

	if(ctx.method === 'GET' && !ctx.headers['data-type']){
		ctx.status = 200;
		ctx.type = 'text/html';
		ctx.body = index;
		return;
	}

	try{
		if(!ctx.isAuthenticated()){
			ctx.throw(401);
		}

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
