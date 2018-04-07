export const state = () => ({
	msg: ''
});

export const mutations = {
	showVeryfyMsg(state, payload){
		let {msg, time} = payload;
		this.msg = msg;

		if(time){
			setTimeout(()=>{
				this.msg = '';
			}, time);
		}
	}
};

export const getters = {
	getMsg(state){
		return state.msg;
	}
}
