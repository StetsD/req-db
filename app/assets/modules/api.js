const axios = require('axios');

async function _rq(props){
	let {method, endpoint, data} = props;
	try{
		return axios[method](endpoint, data ? data : '');
	}catch(err){
		return err;
	}
}

const api = {
	async getClients(){
		return await _rq({
			method: 'get',
			endpoint: '/client'
		});
	},
	async addClient(data){
		return await _rq({
			method: 'post',
			endpoint: '/client',
			data
		});
	}
}

export default api;
