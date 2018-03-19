const DB = require('./db');
const db = DB.instance;

//fixtures
const bossFixtures = require('./src/fixtures/boss').tbody;
const buildingCompanyFixtures = require('./src/fixtures/building-company').tbody;
const buildingFixtures = require('./src/fixtures/building').tbody;
const clientFixtures = require('./src/fixtures/client').tbody;
const customerCompanyFixtures = require('./src/fixtures/customer-company').tbody;
const dealFixtures = require('./src/fixtures/deal').tbody;
const sellerFixtures = require('./src/fixtures/seller').tbody;
const workerFixtures = require('./src/fixtures/worker').tbody;

const {client} = require('./db/models/client');
const {deal} = require('./db/models/deal');
const {building} = require('./db/models/building');
const {buildingCompany} = require('./db/models/building-company');
const {customerCompany} = require('./db/models/customer-company');
const {boss} = require('./db/models/boss');
const {seller} = require('./db/models/seller');
const {worker} = require('./db/models/worker');

DB.init()
.then(async ()=> {

	await client.sync({force: true}).then(()=>{
		clientFixtures.forEach(fix => {
			client.create(fix);
		});
	});

	await building.sync({force: true}).then(()=>{
		buildingFixtures.forEach(fix => {
			building.create(fix);
		});
	});

	await deal.sync({force: true}).then(()=>{
		dealFixtures.forEach(fix => {
			deal.create(fix);
		});
	});

	await buildingCompany.sync({force: true}).then(()=>{
		buildingCompanyFixtures.forEach(fix => {
			buildingCompany.create(fix);
		});
	});

	await customerCompany.sync({force: true}).then(()=>{
		customerCompanyFixtures.forEach(fix => {
			customerCompany.create(fix);
		});
	});

	await boss.sync({force: true}).then(()=>{
		bossFixtures.forEach(fix => {
			boss.create(fix);
		});
	});

	await seller.sync({force: true}).then(()=>{
		sellerFixtures.forEach(fix => {
			seller.create(fix);
		});
	});

	await worker.sync({force: true}).then(()=>{
		workerFixtures.forEach(fix => {
			worker.create(fix);
		});
	});




}).catch(err => {
	console.error(err);
});
