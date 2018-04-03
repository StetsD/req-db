const Koa = require('koa');
const app = new Koa();
const {keys} = require('./config');
const fs = require('fs');
const db = require('./db');
const {router} = require('./router');

const {port} = require('./config');

app.keys = [keys];

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
