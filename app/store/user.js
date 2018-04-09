import api from '../assets/modules/api';
const {addLocalData, removeLocalData, getLocalData} = require('../assets/modules/local-store');

export const state = () => ({
	user: getLocalData() || null
})

export const mutations = {
	login(state, user){
		addLocalData(user);
		state.user = user;
	},
	logout(state){
		removeLocalData();
		state.user = null;
		window.location = '/';
	}
}

export const getters = {
	getUser(state){
		return state.user;
	}
}

export const actions = {
	async getCurrentUser(ctx){
		try{
			let res = await api.getCurrentUser();

			if(res.status === 200){
				ctx.commit('login', {name: res.data.login, verify: res.data.verify});
			}
		}catch(err){
			console.error(err);
		}

	}
}
