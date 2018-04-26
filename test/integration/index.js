let {assert} = require('chai');
let sleep = ms => new Promise(res => setTimeout(res, ms));
const rStore = require('../../lib/redis/redis-store');

var index;
let root = (async () => {
	// await require('../../fixtures');
	// console.log('Fixtures added');
	index = await require('../../index');
})();

describe('integration', async () => {

	before(async () => {
		await root;
	});

	require('./api/client');

	after(() => {
		index.server.close();
		index.redis.client.end(true);
		rStore._redisClient.end(true);
		index.db.instance.close();
	});
});
