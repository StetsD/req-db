const axios = require('axios');
const checkAuth = require('./check-auth');

async function _rq(props){
	let {method, endpoint, data} = props;
	try{
		return await axios[method](endpoint, data ? data : '');
	}catch(err){
		return checkAuth(err.response);
	}
}

const api = {
	//user
	async login(data){
		return await _rq({
			method: 'post',
			endpoint: '/login',
			data
		});
	},
	async logout(){
		return await _rq({
			method: 'post',
			endpoint: '/logout'
		});
	},
	async reg(data){
		return await _rq({
			method: 'post',
			endpoint: '/reg',
			data
		});
	},
	async verifyPost(data){
		return await _rq({
			method: 'post',
			endpoint: '/verifying',
			data
		});
	},
	async getCurrentUser(){
		return await _rq({
			method: 'get',
			endpoint: '/user'
		});
	},

	//Client
	async getClients(id){
		return await _rq({
			method: 'get',
			endpoint: `/client${id ? '/'+id : ''}`
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
	async getCCompany(id){
		return await _rq({
			method: 'get',
			endpoint: `/customer-company${id ? '/'+id : ''}`
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
	async getBCompany(id){
		return await _rq({
			method: 'get',
			endpoint: `/building-company${id ? '/'+id : ''}`
		});
	},
	async addBCompany(data){
		return await _rq({
			method: 'post',
			endpoint: '/building-company',
			data
		});
	},
	async editBCompany(data){
		return await _rq({
			method: 'patch',
			endpoint: `/building-company`,
			data
		});
	},
	async deleteBCompany(id){
		return await _rq({
			method: 'delete',
			endpoint: `/building-company/${id}`
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
		return await _rq({
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
		return await _rq({
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
		return await _rq({
			method: 'get',
			endpoint: `/customer-company/${id}/sellers`
		});
	},
	async addSeller(data){
		return await _rq({
			method: 'post',
			endpoint: `/customer-company/${data.id}/sellers`,
			data: data.seller
		});
	},
	async deleteSeller(data){
		return await _rq({
			method: 'delete',
			endpoint: `/customer-company/${data.id}/sellers/${data.seller.id}`
		});
	},

	//bosses
	async getBoss(id){
		return await _rq({
			method: 'get',
			endpoint: `/building-company/${id}/boss`
		});
	},
	async editBoss(data){
		return await _rq({
			method: 'patch',
			endpoint: `/building-company/${data.building_company_id}/boss`,
			data
		});
	},

	//workers
	async getWorkers(){
		return await _rq({
			method: 'get',
			endpoint: `/worker`
		});
	},
	async getWorker(id){
		return await _rq({
			method: 'get',
			endpoint: `/worker/${id}`
		});
	},
	async addWorker(data){
		return await _rq({
			method: 'post',
			endpoint: `/worker`,
			data
		});
	},
	async deleteWorker(id){
		return await _rq({
			method: 'delete',
			endpoint: `/worker/${id}`
		});
	},
	async editWorker(data){
		return await _rq({
			method: 'patch',
			endpoint: `/worker`,
			data
		});
	},
	async getWorkersByCompId(id){
		return await _rq({
			method: 'get',
			endpoint: `/building-company/${id}/worker`
		});
	}

}

export default api;
