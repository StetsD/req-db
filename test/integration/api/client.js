const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api} = require('../../../config');

let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let modURL = baseURL + '/client';

console.log('check 1')

describe('Test API / client', () => {
console.log('check 2')
	it('Get client', async () => {
console.log('check 3')
		let res = await rq({
			method: 'GET',
			url: modURL,
			timeout: 500
		});
console.log('check 4')
		console.log(res);
		assert(true);
	});

});
