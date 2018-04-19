let {assert} = require('chai');
let config = require('../../../config');

describe('Config test', () => {
	it('Required properties of config', () => {
		assert.isObject(config, 'Config is not an object type');
		assert.hasAllKeys(config, ['api', 'crypto', 'database', 'host', 'io', 'keys', 'limits', 'mailer', 'paths', 'port', 'protocol', 'redis'], 'Required key of config is not found');
		assert.hasAllKeys(config.api, ['version', 'name'], 'Required key of config is not found');
		assert.hasAllKeys(config.database, ['name', 'user', 'password', 'host', 'port', 'dialect'], 'Required key of config is not found');
		assert.hasAllKeys(config.redis, ['host', 'port', 'expireCookie', 'expireTTL', 'expireVerify'], 'Required key of config is not found');
		assert.hasAllKeys(config.crypto, ['hash', 'algorithm'], 'Required key of config is not found');
		assert.hasAllKeys(config.mailer, ['host', 'port'], 'Required key of config is not found');
		assert.hasAllKeys(config.io, ['chat:message', 'app:error', 'app:connect', 'app:disconnect'], 'Required key of config is not found');
		assert.hasAllKeys(config.paths, ['static', 'assetsChat'], 'Required key of config is not found');
		assert.hasAllKeys(config.limits, ['chatFile', 'minImgWidth'], 'Required key of config is not found');
		assert.isArray(config.keys, 'config.keys is not an array');
	});
});
