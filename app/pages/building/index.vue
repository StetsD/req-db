<template lang="html">
	<div class="">
		<Header title="Строения" sub="" icon="building outline"/>
		<button class="ui button green mini" @click="togglePopup('add')">Добавить</button>
		<TableBuildings :buildings="buildings" @delete="deleteBuilding" @edit="togglePopup"/>

		<ModalDefault :visible="visibleMBuildings" @close="togglePopup"  header="Строение">
			<FormBuildingAdd
				slot="content"
				@add="addBuilding"
				@close="togglePopup"
				@cCompanyChange="getCCompanyByName"
				@bCompanyChange="getBCompanyByName"
				:companies="ccompanies"
				:bcompanies="bcompanies"
				:visible="vFBuildingsAdd"
				ok="Добавить"
			/>
			<FormBuildingEdit
				slot="content"
				@edit="editBuilding"
				@close="togglePopup"
				@cCompanyChange="getCCompanyByName"
				@bCompanyChange="getBCompanyByName"
				:companies="ccompanies"
				:bcompanies="bcompanies"
				:building="editingBuilding"
				:visible="vFBuildingsEdit"
				ok="Изменить"
			/>
		</ModalDefault>

		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBuildings from '~/components/tables/TableBuildings';
	import ModalDefault from '~/components/modals/ModalDefault';
	import FormBuildingAdd from '~/components/forms/FormBuildingAdd';
	import FormBuildingEdit from '~/components/forms/FormBuildingEdit';
	import ModalDimmer from '~/components/modals/ModalDimmer';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {
				Header,
				TableBuildings,
				ModalDefault,
				FormBuildingAdd,
				FormBuildingEdit,
				ModalDimmer
		},
		async asyncData(){

			let {data} = await api.getBuildings();

			return {
				//modal
				visibleMBuildings: false,
				visibleDimmer: false,
				//forms
				vFBuildingsAdd: false,
				vFBuildingsEdit: false,
				//data
				buildings: data || [],
				editingBuilding: {name: '', age: ''},
				ccompanies: [],
				bcompanies: []
			}
		},
		methods: {
			togglePopup(type, building){
				this.visibleMBuildings = !this.visibleMBuildings;
				this.toggleDimmer();

				switch(type){
					case 'add':
						this.vFBuildingsAdd = true;
						break;
					case 'edit':
						this.editingBuilding = building;
						this.vFBuildingsEdit = true;
						break;
					default:
						this.vFBuildingsAdd = false;
						this.vFBuildingsEdit = false;
					 	break;
				}


			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addBuilding(formData){
				await api.addBuilding(formData);
				await this.getBuildings();
				this.togglePopup();
			},
			async editBuilding(formData){
				await api.editBuilding(formData);
				await this.getBuildings();
				this.togglePopup();
			},
			async deleteBuilding(building){
				await api.deleteBuilding(building.id);
				await this.getBuildings();
			},
			async getBuildings(){
				let {data} = await api.getBuildings();
				this.buildings = data;
			},
			async getCCompanyByName(val){
				let {data} = await api.getCCompanyByName(val);
				this.ccompanies = data;
			},
			async getBCompanyByName(val){
				let {data} = await api.getBCompanyByName(val);
				this.bcompanies = data;
			}
		}
	}

</script>

<style lang="css">

</style>
