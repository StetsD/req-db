const DB = require('./db');
const db = DB.instance;

const {client} = require('./db/models/client');

DB.init()
.then(()=> {

	client.sync().then(()=>{
		client.create({name: 'Борис Генадич', age: 54});
		client.create({name: 'Пётр Иваныч', age: 43});
		client.create({name: 'Иван Степаныч', age: 36});
		client.create({name: 'Дмитрий Валерич', age: 29});
		client.create({name: 'Владимир Борисыч', age: 62});
		client.create({name: 'Анна Иванна', age: 31});
	});


}).catch(err => {
	console.error(err);
});
