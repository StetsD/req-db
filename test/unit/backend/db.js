const {assert} = require('chai');
const path = require('path');
let root = process.cwd();
let dbPath = path.join(root, 'db');
let modelsPath = path.join(root, 'db', 'models');
const db = require(dbPath);

beforeEach(async () => {
	try{
		await db.init();
	}catch(err){
		throw new Error('Database connection is failed');
	}
});

describe('Database test', () => {
	it('Db module has requried properties', () => {
		assert.isFunction(db.init, 'db.init is not a function');
		assert.isObject(db.instance, 'instance of db not found');
	});

	it('Db correct connection', async () => {


		describe('Testing models', async () => {
			it('Boss model testing', async () => {
				let {boss, getBosses, getBoss, addBoss, editBoss} = require(path.resolve(modelsPath, 'boss'));

				assert.isFunction(boss);
				let res = await addBoss({
					name: 'TestBoss',
					age: 99,
					experience: 99,
					building_company_id: 999999
				});
				console.log(res);
			});
		});



	});


});

afterEach(() => {
	db.instance.close();
});
