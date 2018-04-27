const {assert} = require('chai');
const rq = require('request-promise');
const {port, protocol, host, api, client} = require('../../../config');


let baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
let dataHeader = client.headers['get-api'][0];
let headers = {dataHeader: client.headers['get-api'][1]};

let fixture = {name: 'Boris Britva', age: 56};
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





	});

	// it('Login from admin', async () => {
	// 	let res = await rq({
	// 		method: 'POST',
	// 		url: baseURL + '/login',
	// 		timeout: 500,
	// 		headers,
	// 		body: {
	// 			login: 'admin',
	// 			password: '987654321Qq@'
	// 		},
	// 		json: true
	// 	});
	//
	// });



});
