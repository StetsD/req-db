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
