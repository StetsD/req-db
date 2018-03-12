const {Client} = require('pg');

module.exports = async function createDb(){
	const client = new Client({
		database: 'postgres',
		user: 'postgres',
		host: 'localhost',
		port: '5433',
		password: '987654321Qq'
	});

	await client.connect();

	return client;
}
