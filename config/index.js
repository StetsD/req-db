const path = require('path');

module.exports = {
	host: 'localhost',
	protocol: 'http',
	port: 8000,
	api: {
		version: 'v1',
		name: 'api'
	},
	keys: ['sukablyat', 'mazafaka'],
	database: {
		name: 'building',
		user: 'postgres',
		password: '987654321Qq',
		host: 'localhost',
		port: 5432,
		dialect: 'postgres'
	}
}
