const {assert, expect} = require('chai');
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
	var rootCC;
	var rootBuilding;
	var rootClient;
	var rootDeal;
	var rootBoss;
	var rootSeller;
	var rootUser;


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

	it('Customer Company model testing', async () => {
		const {
			customerCompany,
			getCustomerCompanies,
			addCustomerCompanies,
			getCustomerCompany,
			editCustomerCompany,
			getCustomerCompaniesByName} = require(path.resolve(modelsPath, 'customer-company'));

		assert.isFunction(customerCompany);
		rootCC = await addCustomerCompanies({
			name: 'TestСC'
		});
		assert.isObject(rootCC.dataValues);
		assert.isArray(await getCustomerCompanies());

		await editCustomerCompany({
			id: rootCC.dataValues.id,
			name: 'TestСC 2'
		});
		let editedCc = await getCustomerCompany(rootCC.dataValues.id);
		assert(editedCc.name === 'TestСC 2', 'Edit CusCompany failed');

		let ccByName = await getCustomerCompaniesByName('TestСC');
		assert.isArray(ccByName);
		assert.isObject(ccByName[0]);
	});

	it('Building model testing', async () => {
		const {building,
			getBuildings,
			editBuilding,
			addBuilding,
			getBuildingByName} = require(path.resolve(modelsPath, 'building'));

		assert.isFunction(building);
		rootBuilding = await addBuilding({
			name: 'TestBuilding',
			price: 999999,
			customer_company_id: rootCC.dataValues.id,
			building_company_id: rootBC.dataValues.id
		});
		assert.isObject(rootBuilding.dataValues);
		assert.isArray(await getBuildings());

		await editBuilding({
			id: rootBuilding.dataValues.id,
			name: 'TestBuilding 2',
			price: 999999,
			customer: rootCC.dataValues.id,
			builder: rootBC.dataValues.id
		});
		let buildingByName = await getBuildingByName('TestBuilding');
		assert.isArray(buildingByName);
		assert.isObject(buildingByName[0]);

		assert(buildingByName[0].name === 'TestBuilding 2', 'Edit Building failed');
	});

	it('Client model testing', async () => {
		const {client,
			getClients,
			getClient,
			addClient,
			editClient,
			getClientByName} = require(path.resolve(modelsPath, 'client'));

		assert.isFunction(client);
		rootClient = await addClient({
			name: 'TestClient',
			age: 99
		});
		assert.isObject(rootClient.dataValues);
		assert.isArray(await getClients());

		await editClient({
			id: rootClient.dataValues.id,
			name: 'TestClient 2',
			age: 99
		});

		let editedClient = await getClient(rootClient.dataValues.id);
		assert(editedClient.name === 'TestClient 2', 'Edit Client failed');

		let clientByName = await getClientByName('TestClient');
		assert.isArray(clientByName);
		assert.isObject(clientByName[0]);
	});

	it('Deal model testing', async () => {
		const {deal,
			getDeals,
			addDeal,
			editDeal} = require(path.resolve(modelsPath, 'deal'));

		assert.isFunction(deal);
		rootDeal = await addDeal({
			client_id: rootClient.dataValues.id,
			building_id: rootBuilding.dataValues.id
		});
		assert.isObject(rootDeal.dataValues);
		assert.isArray(await getDeals());

		await editDeal({
			id: rootDeal.dataValues.id,
			client_id: rootClient.dataValues.id,
			building_id: rootBuilding.dataValues.id
		});
	});

	it('Seller model testing', async () => {
		const {seller,
			getSellers,
			addSellers,
			getSellersByCompanyId,
			addSeller} = require(path.resolve(modelsPath, 'seller'));

		assert.isFunction(seller);
		rootSeller = await addSeller({
			name: 'TestSeller',
			age: 99,
			customer_company_id: rootCC.dataValues.id
		});
		assert.isObject(rootSeller.dataValues);
		assert.isArray(await getSellers());
		assert.isArray(await getSellersByCompanyId(rootCC.dataValues.id));
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

	it('User model testing', async () => {
		const {user,
			getUser,
			getMainInfoUser,
			addUser,
			verifyUser,
			getUserByEmail} = require(path.resolve(modelsPath, 'user'));

		assert.isFunction(user);
		rootUser = await addUser({
			login: 'UserTest',
			email: 'user-test@mail.ru',
			password: '987654321Qq@',
			salt: 'sukablyat',
			role: 0,
			verify: 0
		});

		assert.isObject(await getUser({login: 'UserTest'}));
		await verifyUser('user-test@mail.ru');
		let mainInfo = await getMainInfoUser('UserTest');
		let userByEmail = await getUserByEmail('user-test@mail.ru');
		assert.hasAllKeys(mainInfo[0], ['login', 'email', 'verify']);
		assert.equal(mainInfo[0].login, userByEmail.dataValues.login);
		assert.equal(mainInfo[0].verify, 1);
	});

	it('Deleting models', async () => {
		let {deleteBuildingCompany} = require(path.resolve(modelsPath, 'building-company'));
		let {deleteCustomerCompany} = require(path.resolve(modelsPath, 'customer-company'));
		let {deleteBuilding} = require(path.resolve(modelsPath, 'building'));
		let {deleteBoss} = require(path.resolve(modelsPath, 'boss'));
		let {deleteClient} = require(path.resolve(modelsPath, 'client'));
		let {deleteDeal} = require(path.resolve(modelsPath, 'deal'));
		let {deleteSeller} = require(path.resolve(modelsPath, 'seller'));
		let {deleteUser} = require(path.resolve(modelsPath, 'user'));

		await deleteBoss(rootBoss.dataValues.id);
		await deleteDeal(rootDeal.dataValues.id);
		await deleteSeller(rootSeller.dataValues.id);
		await deleteBuildingCompany(rootBC.dataValues.id);
		await deleteCustomerCompany(rootCC.dataValues.id);
		await deleteBuilding(rootBuilding.dataValues.id);
		await deleteClient(rootClient.dataValues.id);
		await deleteUser(rootUser.dataValues.id);
	});

	after(()=>{
		db.instance.close();
	});
});
