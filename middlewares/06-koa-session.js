const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const {redis} = require('../config');

exports.init = app => app.use(session({
	store: redisStore({
		host: redis.host,
		port: redis.port
	}),
	ttl: 64000,
	cookie: {
		maxAge: 64000
	}
}));
