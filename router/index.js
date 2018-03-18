const Router = require('koa-router');
const {api} = require('../config');
const router = new Router();

function apiPath(path){
	return `/${api.name}/${api.version}/${path}`;
}

router.get(apiPath('app'), (ctx, next) => {
	ctx.body = 'APP';
	next();
});

module.exports = router;
