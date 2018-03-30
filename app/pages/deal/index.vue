<template lang="html">
	<div class="">
		<Header title="Сделки" sub="Клиенты и строения" icon="briefcase"/>
		<button class="ui button green mini" @click="togglePopup('add')">Добавить</button>
		<TableDeals
			@edit="editDeal"
			@delete="deleteDeal"
			:deals="deals"/>

		<ModalDefault :visible="visibleModal" @close="togglePopup"  header="Сделка">
			<FormDealAdd
				slot="content"
				@add="addDeal"
				@close="togglePopup"
				@clientChange="getClientByName"
				@buildingChange="getBuildingByName"
				:clients="clients"
				:buildings="buildings"
				:visible="vFDealsAdd"
				ok="Добавить"
			/>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableDeals from '~/components/tables/TableDeals';
	import ModalDefault from '~/components/modals/ModalDefault';
	import ModalDimmer from '~/components/modals/ModalDimmer';
	import FormDealAdd from '~/components/forms/FormDealAdd';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {Header, TableDeals, ModalDefault, ModalDimmer, FormDealAdd},
		async asyncData(){

			try{
				var {data} = await axios('/deal');
			}catch(err){
				console.error(err);
			}

			return {
				//modal
				visibleModal: false,
				visibleDimmer: false,

				vFDealsAdd: false,
				vFDealsEdit: false,

				editingDeal: {client: "", building: ''},
				deals: data || [],
				clients: [],
				buildings: []
			}
		},
		methods: {
			togglePopup(type, deal){
				this.visibleModal = !this.visibleModal;
				this.toggleDimmer();

				switch(type){
					case 'add':
						this.vFDealsAdd = true;
						break;
					case 'edit':
						this.editingDeal = deal;
						this.vFDealsEdit = true;
						break;
					default:
						this.vFDealsAdd = false;
						this.vFDealsEdit = false;
					 	break;
				}
			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addDeal(data){
				await api.addDeal(data);
				await this.getDeals();
				this.togglePopup();
			},
			async editDeal(){

			},
			async deleteDeal(){

			},
			async getDeals(){
				let {data} = await api.getDeals();
				this.deals = data;
			},
			async getClientByName(val){
				let {data} = await api.getClientByName(val);
				this.clients = data;
			},
			async getBuildingByName(val){
				let {data} = await api.getBuildingByName(val);
				this.buildings = data;
			}
		}
	}

</script>

<style lang="css">

</style>
