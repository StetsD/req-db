const path = require('path');

module.exports = {
	host: 'localhost',
	protocol: 'http',
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
	},
	redis: {
		host: '127.0.0.1',
		port: 6379
	}
}
