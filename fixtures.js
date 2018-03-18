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

DB.init()
.then(()=> {

	client.sync({force: true}).then(()=>{
		client.create({name: 'Борис Генадич', age: 54});
		client.create({name: 'Пётр Иваныч', age: 43});
		client.create({name: 'Иван Степаныч', age: 36});
		client.create({name: 'Дмитрий Валерич', age: 29});
		client.create({name: 'Владимир Борисыч', age: 62});
		client.create({name: 'Анна Иванна', age: 31});
	});

	deal.sync().then(()=>{
		dealFixtures.forEach(fix => {
			let {client, building} = fix;
			deal.create({client, building});
		});
	});


}).catch(err => {
	console.error(err);
});
