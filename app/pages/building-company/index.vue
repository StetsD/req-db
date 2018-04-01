<template lang="html">
	<div class="">
		<Header title="Подрядчики" sub="" icon="cog"/>
		<button class="ui button green mini" @click="togglePopup('add')">Добавить</button>
		<TableBCompanies
			@edit="togglePopup"
			@delete="deleteCompany"
			:companies="companies"/>

		<ModalDefault @close="togglePopup" :visible="visibleModal" header="Подрядчик">
			<FormCompanyAdd
				slot="content"
				@add="addCompany"
				@close="togglePopup"
				:visible="vFCompanyAdd"
				ok="Добавить"
			/>

			<FormCompanyEdit
				slot="content"
				@edit="editCompany"
				@close="togglePopup"
				:company="editingCompany"
				:visible="vFCompanyEdit"
				ok="Изменить"
			/>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBCompanies from '~/components/tables/TableBuildingCompanies';
	import ModalDefault from '~/components/modals/ModalDefault';
	import ModalDimmer from '~/components/modals/ModalDimmer';
	import FormCompanyAdd from '~/components/forms/FormBCompanyAdd';
	import FormCompanyEdit from '~/components/forms/FormCompanyEdit';


	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components:{Header,
					TableBCompanies,
					ModalDefault,
					ModalDimmer,
					FormCompanyAdd,
					FormCompanyEdit
		},
		async asyncData(){
			try{
				var {data} = await axios('/building-company');
			}catch(err){
				console.error(err);
			}

			return {
				//modal
				visibleModal: false,
				visibleDimmer: false,

				vFCompanyAdd: false,
				vFCompanyEdit: false,

				editingCompany: {name: "", managers: []},
				companies: data || [],
			}
		},
		methods: {
			togglePopup(type, company){
				this.visibleModal = !this.visibleModal;
				this.toggleDimmer();

				switch(type){
					case 'add':
						this.vFCompanyAdd = true;
						break;
					case 'edit':
						this.editingCompany = company;
						this.vFCompanyEdit = true;
						break;
					default:
						this.vFCompanyAdd = false;
						this.vFCompanyEdit = false;
						break;
				}
			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addCompany(data){
				await api.addBCompany(data);
				await this.getCompanies();
				this.togglePopup();
			},
			async editCompany(data){
				await api.editBCompany(data);
				await this.getCompanies();
				this.togglePopup();
			},
			async deleteCompany(company){
				await api.deleteBCompany(company.id);
				await this.getCompanies();
			},
			async getCompanies(){
				let {data} = await api.getBCompany();
				this.companies = data;
			}
		}
	}

</script>

<style lang="css">

</style>
