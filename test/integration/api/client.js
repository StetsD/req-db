const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api, client} = require('../../../config');


let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let headers = {};
headers[client.headers['get-api'][0]] = client.headers['get-api'][1];
let fixture = {name: 'Борис Бритва', age: '56'};
let j = rq.jar();

describe('Test API / client', () => {
	it('Add client', async () => {
		let cookie = rq.cookie(global.sessionName.cookie);
		j.setCookie(cookie, baseURL + '/client');

		let res = await rq({
			method: 'POST',
			url: baseURL + '/client',
			timeout: 500,
			headers,
			body: {
				name: fixture.name,
				age: fixture.age
			},
			json: true,
			jar: j
		});

		assert.isOk(res);
		assert.hasAnyKeys(res, ['name', 'age', 'id']);
		fixture.id = res.id;
	});

	it('Patch client', async () => {
		let res = await rq({
			method: 'PATCH',
			url: baseURL + '/client' + `/${fixture.id}`,
			timeout: 500,
			headers,
			body: {
				name: 'БорисХренПопадёшь',
				age: '45'
			},
			json: true
		});

		assert.isOk(res);
		assert.hasAnyKeys(res, ['name', 'age']);

	});

	it('Get all clients', async () => {
		let res = await rq({
			method: 'GET',
			url: baseURL + '/client',
			timeout: 500,
			headers
		});

		assert.isOk(res);
	});

	it('Get Client by id', async () => {
		let res = await rq({
			method: 'GET',
			url: baseURL + '/client' + `/${fixture.id}`,
			timeout: 500,
			headers,
			json: true
		});

		assert.isOk(res);
		assert.hasAnyKeys(res, ['name', 'age', 'id', 'createdAt', 'updatedAt']);
	});

	it('Delete Client by id', async () => {
		let res = await rq({
			method: 'DELETE',
			url: baseURL + '/client' + `/${fixture.id}`,
			timeout: 500,
			headers,
			json: true
		});

		assert.isOk(res);
		assert.hasAnyKeys(res, ['id']);
	});



});
