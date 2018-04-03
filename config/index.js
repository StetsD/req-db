const path = require('path');

module.exports = {
	port: 8000,
	keys: ['sukablyat', 'mazafaka'],
	api: {
		version: 'v1',
		name: 'api'
	},
	database: {
		name: 'building',
		user: 'postgres',
		password: '987654321Qq',
		host: 'localhost',
		port: 5432,
		dialect: 'postgres'
	}
}
