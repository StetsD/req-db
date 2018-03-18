const Router = require('koa-router');
const {api} = require('../config');
const fs = require('fs');
const path = require('path');
const router = new Router();

let index = fs.readFileSync(path.resolve(process.cwd(), 'public', 'index.html'), (err, data) => {
	if(err) throw err;
});

function apiPath(path){
	return `/${api.name}/${api.version}/${path}`;
}

router.get('/', (ctx, next) => {
	ctx.type = 'text/html';
	ctx.body = index;
});

module.exports = {router, apiPath};

fs.readdirSync(__dirname, (err) => {
	if(err) throw new Error(err);
})
.forEach(routes => routes !== 'index.js' ? require(`./${routes}`) : null);
