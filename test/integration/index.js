let {assert} = require('chai');
let sleep = ms => new Promise(res => setTimeout(res, ms));
const rq = require('request-promise');

const {port, protocol, host, api} = require('../../config');

let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let modURL = baseURL + '/client';

var index;
let root = new Promise((res, rej)=>{
	(async () => {
		await require('../../fixtures');
		index = await require('../../index');
		res(true);
	})();
});

describe('integration', async () => {

	before(async () => {
		await root;
	});

	require('./api/client');

	after(() => {
		index.server.close();
		index.redis.client.end(true);
		index.db.instance.close();
	})
});
