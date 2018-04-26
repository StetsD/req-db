const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api, client} = require('../../../config');

let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let url = baseURL + '/user';

let headers = {client.headers['get-api'][0]: client.headers['get-api'][1]};

describe('Test API / client', () => {

	it('Login from admin', async () => {
		let res = await rq({
			method: 'GET',
			url: baseURL + '/user/login',
			timeout: 500,
			headers
		});

		console.log(res);
		assert(true === true);
	});

});
