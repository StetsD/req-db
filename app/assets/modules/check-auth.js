const {addLocalData, removeLocalData, getLocalData} = require('./local-store');

module.exports = (err) => {
	let {data, status} = err;
	let {$nuxt} = window;

	if(status === 401){
		removeLocalData();
		window.location = '/';
	}

	return {data, status};
}
