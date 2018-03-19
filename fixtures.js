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

DB.init()
.then(()=> {

	client.sync({force: true}).then(()=>{
		clientFixtures.forEach(fix => {
			let {name, age} = fix;
			client.create({name, age});
		});
	});

	deal.sync({force: true}).then(()=>{
		dealFixtures.forEach(fix => {
			let {client, building} = fix;
			deal.create({client, building});
		});
	});

	building.sync({force: true}).then(()=>{
		buildingFixtures.forEach(fix => {
			let {name, price, customer_company, building_company} = fix;
			building.create({name, price, customer_company, building_company});
		});
	});




}).catch(err => {
	console.error(err);
});
