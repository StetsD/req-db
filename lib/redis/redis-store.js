const {redis} = require('../../config');
const redisStore = require('koa-redis');

let rStore = redisStore({
	host: redis.host,
	port: redis.port
});

module.exports = rStore;
