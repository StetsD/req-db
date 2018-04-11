import api from '../assets/modules/api';


export const state = () => ({
	history: []
});

export const mutations = {
	addMsg(state, payload){
		state.history.push(payload);
	},
	setHistory(state, payload){
		state.history = payload;
	}
}

export const actions = {
	async fetchHistory(ctx){
		let {data} = await api.getChatHistory();
		ctx.commit('setHistory', data);
	}
}

export const getters = {
	getHistory(state){
		return state.history;
	}
}
