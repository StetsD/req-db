let {assert} = require('chai');
let sleep = ms => new Promise(res => setTimeout(res, ms));
const rq = require('request-promise');

var index;
let root = new Promise((res, rej)=>{
	(async () => {
		await require('../../fixtures');
		index = await require('../../index');
		res(true);
	})();
});


(async () => {
	await root;

	require('./api/client');

	// describe('integration', async () => {
	// 	it('It should integration', function(){
	//
	// 	});
	// });

})();
