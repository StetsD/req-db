const {api} = require('../config');
let apiPath = `/${api.name}/${api.version}/`;

const map = {};
map[`${apiPath}login::POST`] = true;
map[`${apiPath}reg::POST`] = true;
map[`/verify::GET`] = true;


exports.init = app => app.use(async (ctx, next) => {
	let {path, method} = ctx;

	if(map[`${path}::${method.toUpperCase()}`]){
		return next();
	}

	if(ctx.isAuthenticated()){
		return next();
	}

	ctx.status = 401;
	ctx.body = {status: 'unauthorized'};

});
