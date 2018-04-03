const session = require('koa-generic-session');
const PgStore = require('koa-pg-session');
const {database} = require('../config');

let {name, user, password, port, host} = database;

let pgStore = new PgStore(`postgres://${user}:${password}@${host}:${port}/${name}`);

pgStore.setup();

exports.init = app => app.use(session({
	key: 'sid',
	store: pgStore
}, app));
