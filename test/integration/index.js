let {assert} = require('chai');
let sleep = ms => new Promise(res => setTimeout(res, ms));

// const rq = require('request-promise');
const {port, protocol, host, api} = require('../../config');
//
// let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
// let modURL = baseURL + '/client';
const rStore = require('../../lib/redis/redis-store');

var index;
let root = (async () => {
	await require('../../fixtures');
	console.log('Fixtures added')
	index = await require('../../index');
})();

describe('integration', async () => {

	before(async () => {
		await root;
	});

	// require('./api/client');

	it('lalala', () => {
		assert(true == true);
	});

	after(() => {
		index.server.close();
		index.redis.client.end(true);
		rStore._redisClient.end(true);
		index.db.instance.close();
	});
});
