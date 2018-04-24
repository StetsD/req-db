let {assert} = require('chai');
let fs = require('fs');
let rimraf = require('rimraf');

describe('Hashing password tests', () => {
	let {createHashPass, checkPass} = require('../../../lib/credentialsHash');
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

describe('Tools test', () => {
	let dateTools = require('../../../lib/tools/formatDate');
	let mkdir = require('../../../lib/tools/mkdir-r');


	it('formatZero works fine', () => {
		assert.equal(dateTools.formatZero(1), '01', 'Method must return 2 signs');
		assert.equal(dateTools.formatZero(20), '20', 'Method must return 1 sign');
	});

	it('getDate works fine', () => {
		let date = dateTools.getDate();
		assert.hasAllKeys(date, ['date', 'time']);
		assert.lengthOf(date.date, 8);
		assert.lengthOf(date.time, 5);
	});

	it('mkdir custom method works fine', async () => {
		let path = `megatest/supertest/test`;
		await mkdir(path);
		let stat = await new Promise((res, rej)=>{
			fs.stat(path, (err, st) => {
				if(err) throw new Error(err);
				res(st);
			});
		});
		assert.equal(stat.isDirectory(), true, 'Can`t find directory ' + path);
		rimraf('megatest', (err) => {if(err) throw new Error(err)})
	});
});
