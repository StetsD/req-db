module.exports = (err) => {
	let {data, status} = err;
	let {$nuxt} = window;

	if(status === 401){
		window.location = '/';
	}

	return {data, status};
}
