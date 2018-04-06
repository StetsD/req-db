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
		port: 5433,
		dialect: 'postgres'
	},
	redis: {
		host: '127.0.0.1',
		port: 6379,
		expireVerify: 1000 // seconds
	},
	crypto: {
		hash: {
			length: 128,
			iterations: 12000
		},
		algorithm: 'sha256'
	},
	mailer: {
		host: 'smtp.yandex.ru',
		port: 465,
		auth: {
			user: '',
			pass: ''
		}
	}
}
