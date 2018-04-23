let {assert} = require('chai');
let {createHashPass, checkPass} = require('../../../lib/credentialsHash');

describe('Hashing password tests', () => {
	var hashPass;

	it('Should return object', async () => {
		hashPass = await createHashPass('987654321Qq@');
		assert.isObject(hashPass);
		assert.hasAllKeys(hashPass, ['salt', 'passwordHash']);
	});

	it('checkPass method correct comparing', async () => {
		let result = await checkPass('987654321Qq@', hashPass.passwordHash, hashPass.salt);
	});
});

describe('Redis client tests', () => {
	let redis = require('../../../lib/redis');

	it('Redis client works', () => {
		assert.isObject(redis);
	});

	it('Redis has all required methods', () => {
		assert.hasAllKeys(redis, ['rSet', 'rGet', 'client']);
	});

	after(()=>{
		redis.client.end(true);
	});
});

describe('Sockets serverside tests', () => {
	let sio = require('../../../lib/socket-io');

	console.log(sio);
});
