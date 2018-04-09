var timeout;

export const state = () => ({
	msg: {}
});

export const mutations = {
	changeState(state, obj){
		if(obj && obj.status && obj.msg){
			state.msg = obj;
		}else{
			state.msg = {};
		}
	},
}

export const actions = {
	callChangeState(ctx, obj){
		ctx.commit('changeState', obj);
		clearTimeout(timeout);
		timeout = setTimeout(()=>{
			if(ctx.state.msg.status && ctx.state.msg.msg){
				ctx.commit('changeState');
			}
		}, 3000);
	}
}

export const getters = {
	getTooltip(state){
		return state.msg;
	}
}
