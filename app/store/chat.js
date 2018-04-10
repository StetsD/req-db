import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
const {protocol, host, port, io} = require('../../config');
const IO = require('socket.io-client')(`${protocol}://${host}:${port}`);
import api from '../assets/modules/api';

IO.on('disconnect', () => {
	console.log('sockets are disconnected');
});

IO.on(io['chat:message'], msg => {
	console.log(msg)
	$nuxt.$store.commit('chat/addMsg', msg);
});


export const state = () => ({
	history: []
});

export const mutations = {
	addMsg(state, payload){
		state.history.push(payload);
		console.log(state.history)
	},
	setHistory(state, payload){
		state.history = payload;
	}
}

export const actions = {
	sendMsg(ctx, {name, msg}){
		IO.emit(io['chat:message'], {name, msg});
	},
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
