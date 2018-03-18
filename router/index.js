const Router = require('koa-router');
const {api} = require('../config');
const fs = require('fs');
const path = require('path');
const router = new Router();

const {getClient} = require('../db/models/client');

let index = fs.readFileSync(path.resolve(process.cwd(), 'public', 'index.html'), (err, data) => {
	if(err) throw err;
});

function apiPath(path){
	return `/${api.name}/${api.version}/${path}`;
}

router.post('/', (ctx, next) => {
	ctx.type = 'text/html';
	ctx.body = index;
});


router.get(apiPath('client'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClient();
	next();
});

module.exports = router;
