let {assert} = require('chai');

describe('e2e', ()=>{
	it('It should e2e', done => {
		assert('foo' !== 'bar', done(new Error('foo is not bar')));
	});
});
