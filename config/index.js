module.exports = {
	host: 'localhost',
	protocol: 'http',
	port: 8000,
	keys: ['sukablyat', 'mazafaka', 'sasasasa'],
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
		port: 6379,
		expireCookie: (60 * 60 * 24) * 1000,
		expireTTL: (60 * 60 * 24) * 1000,
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
		port: 465
	},
	io: {
		'chat:message': 'chat:message',
		'app:error': 'app:error',
		'app:connect': 'app:connect',
		'app:disconnect': 'app:disconnect'
	},
	paths: {
		static: '/assets',
		assetsChat: '/chat/assets'
	},
	limits: {
		chatFile: 1073741824,
		minImgWidth: 200
	}
}
