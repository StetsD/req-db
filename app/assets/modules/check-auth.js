module.exports = (err) => {
	let {data, status} = err;
	let {$nuxt} = window;

	if(data.status === 'unauthorized' && status === 401){
		window.location = '/';
	}
}
