const {addLocalData, removeLocalData, getLocalData} = require('./local-store');

module.exports = (err) => {
	let {data, status} = err;
	let {$nuxt} = window;

	if(status === 401){
		removeLocalData();
		window.location = '/';
	}

	if(status === 400 && data.status === 'not verifyed'){
		$nuxt.$store.dispatch('tooltip/callChangeState', {msg: 'Ваш аккаунт не верифецирован.Пройдите верификацию в личном кабинете', status: 'error'});
	}

	if(status === 403 && data.status === 'forbidden'){
		$nuxt.$store.dispatch('tooltip/callChangeState', {msg: 'Отказано в доступе', status: 'error'});
	}

	return {data, status};
}
