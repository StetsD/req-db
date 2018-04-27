const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api, client} = require('../../../config');
let {client: rCli} = require('../../../lib/redis');


let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let dataHeader = client.headers['get-api'][0];
let headers = {dataHeader: client.headers['get-api'][1]};

describe('Test API / user', () => {

	it('Login bad credentials', async () => {
		try{
			await rq({
				method: 'POST',
				url: baseURL + '/login',
				timeout: 500,
				headers,
				json: true,
				body: {
					login: 'mazafaka',
					password: '12345'
				}
			});
		}catch(err){
			assert.equal(err.statusCode, 400);
			assert.hasAllKeys(err.error, ['status'], 'absent "status" field');
		}
	});

	it('Login from admin', async () => {
		let res = await rq({
			method: 'POST',
			url: baseURL + '/login',
			timeout: 500,
			headers,
			body: {
				login: 'admin',
				password: '987654321Qq@'
			},
			json: true
		});

		let sessionName = await new Promise((res, rej) => {
			rCli.multi()
				.keys('*', (err, reply) => {
					return res(reply);
				})
				.exec();
		});

		assert.hasAllKeys(res, ['login', 'email', 'verify'], 'Response on login must return main info about user');
		assert.isOk(sessionName[0], 'Redis Session not found');
		let parseSID = sessionName[0].split(':');
		global.sessionName = {
			key: `${parseSID[0]}:${parseSID[1]}`,
			value: parseSID[2],
			cookie: `koa.sid` + '=' + parseSID[2]
		};
	});



});
