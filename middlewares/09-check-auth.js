const {api} = require('../config');
let apiPath = `/${api.name}/${api.version}/`;

const map = {};
map[`${apiPath}login::POST`] = true;
map[`${apiPath}reg::POST`] = true;


exports.init = app => app.use(async (ctx, next) => {
	let {originalUrl, method} = ctx;

	if(map[`${originalUrl}::${method.toUpperCase()}`]){
		return next();
	}

	if(ctx.isAuthenticated()){
		return next();
	}

	ctx.status = 401;
	ctx.body = {status: 'unauthorized'};

});
