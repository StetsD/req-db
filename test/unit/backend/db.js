const {assert} = require('chai');
const db = require('../../../db');

describe('Database test', () => {
	it('Db module has requried properties', () => {
		assert.isFunction(db.init, 'db.init is not a function');
		assert.isObject(db.instance, 'instance of db not found');
	});

	it('Db correct connection', async () => {
		try{
			await db.init();
		}catch(err){
			throw new Error('Database connection is failed');
		}

		db.instance.close();
	});
});
