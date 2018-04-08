const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const {redis} = require('../config');

exports.init = app => app.use(session({
	store: redisStore({
		host: redis.host,
		port: redis.port
	}),
	ttl: redis.expireTTL,
	cookie: {
		maxAge: redis.expireCookie
	}
}));
