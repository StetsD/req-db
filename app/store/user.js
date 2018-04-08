import api from '../assets/modules/api';

export const state = () => ({
	user: null
})

export const mutations = {
	login(state, user){
		state.user = user;
	},
	logout(state){
		state.user = null;
	},
	async getUser(state){
		let {data} = await api.getUser();
	}
}

export const getters = {
	getUser(state){
		return state.user;
	}
}
