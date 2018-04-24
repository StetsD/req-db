const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api} = require('../../../config');

let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let modURL = baseURL + '/client';

describe('Test API / client', () => {

	it('Get client', async () => {
		let res = await rq({
			method: 'GET',
			url: modURL,
			timeout: 500
		});

		// console.log(res);
		assert(true === true);
	});

});
