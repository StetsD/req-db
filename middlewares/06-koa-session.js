const session = require('koa-generic-session');
const rStore = require('../lib/redis/redis-store');
const {redis} = require('../config');

exports.init = app => {
	app.redisStore = rStore;
	app.use(session({
		store: rStore,
		ttl: redis.expireTTL,
		cookie: {
			maxAge: redis.expireCookie
		}
	}));
};
