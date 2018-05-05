const DB = require('./db');
const db = DB.instance;
const {client: rClient} = require('./lib/redis');

//fixtures
const bossFixtures = require('./src/fixtures/boss').tbody;
const buildingCompanyFixtures = require('./src/fixtures/building-company').tbody;
const buildingFixtures = require('./src/fixtures/building').tbody;
const clientFixtures = require('./src/fixtures/client').tbody;
const customerCompanyFixtures = require('./src/fixtures/customer-company').tbody;
const dealFixtures = require('./src/fixtures/deal').tbody;
const sellerFixtures = require('./src/fixtures/seller').tbody;
const workerFixtures = require('./src/fixtures/worker').tbody;
const workerToCompanyFixtures = require('./src/fixtures/worker-to-company').tbody;
const roleFixtures = require('./src/fixtures/role').tbody;
const userFixtures = require('./src/fixtures/user').tbody;

const {client} = require('./db/models/client');
const {deal} = require('./db/models/deal');
const {building} = require('./db/models/building');
const {buildingCompany} = require('./db/models/building-company');
const {customerCompany} = require('./db/models/customer-company');
const {boss} = require('./db/models/boss');
const {seller} = require('./db/models/seller');
const {worker} = require('./db/models/worker');
const {workerToCompany} = require('./db/models/worker-to-company');
const {role} = require('./db/models/role');
const {user} = require('./db/models/user');

module.exports = DB.init()
.then(async ()=> {

	await client.sync({force: true}).then(()=>{
		clientFixtures.forEach(fix => {
			client.create(fix);
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

	await building.sync({force: true}).then(()=>{
		buildingFixtures.forEach(fix => {
			building.create(fix);
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

	await workerToCompany.sync({force: true}).then(()=>{
		workerToCompanyFixtures.forEach(fix => {
			workerToCompany.create(fix);
		});
	});

	await role.sync({force: true}).then(()=>{
		roleFixtures.forEach(fix => {
			role.create(fix);
		});
	});

	await user.sync({force: true}).then(()=>{
		userFixtures.forEach(fix => {
			user.create(fix);
		});
	});

	await rClient.lpush('chat-history', JSON.stringify({
		name: 'test',
		msg: 'test',
		date: '00.00.00',
		time: '00:00'
	}));

	process.argv[2] === '--exit' && process.exit(0);

}).catch(err => {
	console.error(err);
});
