let {assert} = require('chai');
let Vue = require('vue');
let Index = require('../../../app/pages/index.vue');
// import Vue from 'vue';
// import Index from '../../../app/pages/index.vue';

describe('Index page', () => {
	it('Page is a function', () => {
		console.log(Index);
		assert.isFunction(Index, 'Page is a function 222');
	});
});
