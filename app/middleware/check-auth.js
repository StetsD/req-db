const api = require('../assets/modules/api').default;
const {getLocalData} = require('../assets/modules/local-store');

export default async function({store}, next){
	let dataLoc = getLocalData();

	if(!dataLoc && window.location.pathname !== '/'){
		await api.logout();
		store.commit('user/logout');
	}


	next();
}
