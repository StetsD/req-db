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
	//Client
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
	},
	async editClient(data){
		return await _rq({
			method: 'patch',
			endpoint: `/client/${data.id}`,
			data
		});
	},
	async deleteClient(id){
		return await _rq({
			method: 'delete',
			endpoint: `/client/${id}`
		});
	},
	async getClientByName(name){
		return await _rq({
			method: 'get',
			endpoint: `/client?q=${name}`
		});
	},

	//Customer company
	async getCCompany(){
		return await _rq({
			method: 'get',
			endpoint: '/customer-company'
		});
	},
	async addCCompany(data){
		return await _rq({
			method: 'post',
			endpoint: '/customer-company',
			data
		});
	},
	async editCCompany(data){
		return await _rq({
			method: 'patch',
			endpoint: `/customer-company`,
			data
		});
	},
	async deleteCCompany(id){
		return await _rq({
			method: 'delete',
			endpoint: `/customer-company/${id}`
		});
	},
	async getCCompanyByName(val){
		return await _rq({
			method: 'get',
			endpoint: `/customer-company?q=${val}`
		});
	},

	//Building cCompany
	async getBCompany(){
		return await _rq({
			method: 'get',
			endpoint: '/building-company'
		});
	},
	async getBCompanyByName(val){
		return await _rq({
			method: 'get',
			endpoint: `/building-company?q=${val}`
		});
	},

	//buildings
	async getBuildings(){
		return await _rq({
			method: 'get',
			endpoint: '/building'
		});
	},
	async addBuilding(data){
		return await _rq({
			method: 'post',
			endpoint: '/building',
			data
		});
	},
	async editBuilding(data){
		return _rq({
			method: 'patch',
			endpoint: '/building',
			data
		})
	},
	async deleteBuilding(id){
		return await _rq({
			method: 'delete',
			endpoint: `/building/${id}`
		});
	},
	async getBuildingByName(name){
		return await _rq({
			method: 'get',
			endpoint: `/building?q=${name}`
		});
	},

	//deals
	async getDeals(){
		return await _rq({
			method: 'get',
			endpoint: '/deal'
		});
	},
	async addDeal(data){
		return await _rq({
			method: 'post',
			endpoint: '/deal',
			data
		});
	},
	async editDeal(data){
		return _rq({
			method: 'patch',
			endpoint: '/deal',
			data
		})
	},
	async deleteDeal(id){
		return await _rq({
			method: 'delete',
			endpoint: `/deal/${id}`
		});
	},

	//sellers
	async getSellersByCompanyId(id){
		return _rq({
			method: 'get',
			endpoint: `/customer-company/${id}/sellers`
		});
	},
	async addSeller(data){
		return _rq({
			method: 'post',
			endpoint: `/customer-company/${data.id}/sellers`,
			data: data.seller
		});
	},
	async deleteSeller(data){
		return _rq({
			method: 'delete',
			endpoint: `/customer-company/${data.id}/sellers/${data.seller.id}`
		});
	},

}

export default api;
