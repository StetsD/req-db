const {keys, port, io} = require('./config');

const Koa = require('koa');
const app = new Koa();
const server = require('http').createServer(app.callback());
const {init: sioInit} = require('./lib/socket-io');
const fs = require('fs');
const db = require('./db');
const {router} = require('./router');
const redis = require('./lib/redis');

sioInit(server);
app.keys = keys;

const middlewares = fs.readdirSync('./middlewares');
middlewares.forEach(handler => {
	require(`./middlewares/${handler}`).init(app);
});

app.use(router.routes());

module.exports = db.init().then(()=>{
	server.listen(port);
	console.log('SERVER STARTED')
	return {
		server
	}
}).catch(err => {
	throw err;
});
