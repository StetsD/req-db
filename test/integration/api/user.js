const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api, client} = require('../../../config');

let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;

let dataHeader = client.headers['get-api'][0];
let headers = {dataHeader: client.headers['get-api'][1]};

describe('Test API / client', () => {

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


		assert(true === true);
	});

});
