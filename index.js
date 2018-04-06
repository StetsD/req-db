const Koa = require('koa');
const app = new Koa();
const {keys, port} = require('./config');
const fs = require('fs');
const db = require('./db');
const {router} = require('./router');

const redis = require('./lib/redis');

app.keys = keys;

const middlewares = fs.readdirSync('./middlewares');
middlewares.forEach(handler => {
	require(`./middlewares/${handler}`).init(app);
});

app.use(router.routes());

db.init().then(()=>{
	app.listen(port);
}).catch(err => {
	throw err;
});


module.exports = app;
