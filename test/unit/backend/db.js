const {assert} = require('chai');
const path = require('path');
let root = process.cwd();
let dbPath = path.join(root, 'db');
let modelsPath = path.join(root, 'db', 'models');
const db = require(dbPath);

describe('Database test', () => {
	before(async () => {
		try{
			await db.init();
		}catch(err){
			throw new Error('Database connection is failed');
		}
	})

	it('Db module has requried properties', () => {
		assert.isFunction(db.init, 'db.init is not a function');
		assert.isObject(db.instance, 'instance of db not found');
	});

	var rootBC;
	var rootBoss;


	it('Building Company model testing', async () => {
		let { buildingCompany,
			getBuildingCompanies,
			getBuildingCompany,
			getBuildingCompanyByName,
			editBuildingCompany,
			deleteBuildingCompany,
			addBuildingCompany} = require(path.resolve(modelsPath, 'building-company'));

		assert.isFunction(buildingCompany);
		rootBC = await addBuildingCompany({
			name: 'TestBC',
			address: 'TestBC'
		});
		assert.isObject(rootBC.dataValues);

	});

	it('Boss model testing', async () => {
		let {boss, getBosses, getBoss, addBoss, editBoss} = require(path.resolve(modelsPath, 'boss'));

		assert.isFunction(boss);
		rootBoss = await addBoss({
			name: 'TestBoss',
			age: 99,
			experience: 99,
			building_company_id: 999999
		});
		assert.isObject(rootBoss.dataValues);
		let returnedBoss = await getBoss(rootBoss.dataValues.id);

	});

	it('Deleting models', async () => {
		let {deleteBuildingCompany} = require(path.resolve(modelsPath, 'building-company'));
		let {deleteBoss} = require(path.resolve(modelsPath, 'boss'));

		await deleteBoss(rootBoss.dataValues.id);
		await deleteBuildingCompany(rootBC.dataValues.id);
	});

	after(()=>{
		db.instance.close();
	});
});
