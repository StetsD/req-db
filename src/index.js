const {Client} = require('pg');
const client = new Client({host: 'localhost', password: '987654321Qq', port:5433, user: 'postgres', database: 'postgres'});

client.connect(err => {
	console.log(err);
	console.log('alalal')
});
