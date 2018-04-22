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
			addBuildingCompany} = require(path.resolve(modelsPath, 'building-company'));

		assert.isFunction(buildingCompany);
		rootBC = await addBuildingCompany({
			name: 'TestBC',
			address: 'TestBC'
		});
		assert.isObject(rootBC.dataValues);
		assert.isArray(await getBuildingCompanies());

		await editBuildingCompany({
			id: rootBC.dataValues.id,
			name: 'TestBC 2',
			address: 'TestBC 2'
		});
		let editedBc = await getBuildingCompany(rootBC.dataValues.id);
		assert(editedBc.name === 'TestBC 2', 'Edit BuildingCompany failed');

		let bcByName = await getBuildingCompanyByName('TestBC');
		assert.isArray(bcByName);
		assert.isObject(bcByName[0]);

	});

	it('Boss model testing', async () => {
		let {boss, getBosses, getBoss, addBoss, editBoss} = require(path.resolve(modelsPath, 'boss'));

		assert.isFunction(boss);
		rootBoss = await addBoss({
			name: 'TestBoss',
			age: 99,
			experience: 99,
			building_company_id: rootBC.dataValues.id
		});
		assert.isObject(rootBoss.dataValues);
		assert.isArray(await getBosses());
		let lala = await editBoss({
			building_company_id: rootBC.dataValues.id,
			name: 'TestBoss 2',
			age: 99,
			experience: 99
		});
		let returnedBoss = await getBoss(rootBC.dataValues.id);
		assert.isArray(returnedBoss);
		assert(returnedBoss[0].dataValues.name === 'TestBoss 2', 'Edit boss failed');
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
