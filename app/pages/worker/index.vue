<template lang="html">
	<div class="">
		<Header title="Рабочие" icon="users"/>
		<h2>Рабочие</h2>
		<button class="ui button green mini" @click="togglePopup('add')">Добавить</button>
		<TableWorkers
			@delete="deleteWorker"
			@edit="togglePopup"
			:workers="workers"
			func="true"/>

		<ModalDefault :visible="visibleModal" @close="togglePopup"  header="Рабочий">
			<FormWorkerAdd
				slot="content"
				@add="addWorker"
				@close="togglePopup"
				@companyChange="getCompanyByName"
				:companies="companies"
				:visible="vFWorkersAdd"
				ok="Добавить"
			/>

			<FormWorkerEdit
				slot="content"
				@edit="editWorker"
				@close="togglePopup"
				@companyChange="getCompanyByName"
				:worker="editingWorker"
				:companies="companies"
				:visible="vFWorkersEdit"
				ok="Изменить"
			/>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableWorkers from '~/components/tables/TableWorkers';
	import ModalDefault from '~/components/modals/ModalDefault';
	import ModalDimmer from '~/components/modals/ModalDimmer';
	import FormWorkerAdd from '~/components/forms/FormWorkerAdd';
	import FormWorkerEdit from '~/components/forms/FormWorkerEdit';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {
				Header,
				TableWorkers,
				ModalDefault,
				ModalDimmer,
				FormWorkerAdd,
				FormWorkerEdit
		},
		async asyncData(ctx){

			var {data} = await api.getWorkers();

			return {
				//modal
				visibleModal: false,
				visibleDimmer: false,
				//form
				vFWorkersAdd: false,
				vFWorkersEdit: false,
				//data
				editingWorker: {client: "", building: ''},
				companies: [],
				workers: data || []
			}
		},
		methods: {
			async togglePopup(type, worker){
				this.visibleModal = !this.visibleModal;
				this.toggleDimmer();

				switch(type){
					case 'add':
						this.vFWorkersAdd = true;
						break;
					case 'edit':
						await this.getCompaniesByWorkerId(worker.id);
						this.editingWorker = worker;
						this.vFWorkersEdit = true;
						break;
					default:
						this.vFWorkersAdd = false;
						this.vFWorkersEdit = false;
					 	break;
				}
			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addWorker(data){
				await api.addWorker(data);
				await this.getWorkers();
				this.togglePopup();
			},
			async editWorker(data){
				await api.editWorker(data);
				await this.getWorkers();
				this.togglePopup();
			},
			async deleteWorker(worker){
				await api.deleteWorker(worker.id);
				await this.getWorkers();
			},
			async getWorkers(){
				let {data} = await api.getWorkers();
				this.workers = data;
			},

			//service
			async getCompanyByName(val){
				let {data} = await api.getBCompanyByName(val);
				this.companies = data;
			},
			async getCompaniesByWorkerId(id){
				let {data} = await api.getWorker(id);
				this.companies = data.companies;
			}
		}
	}

</script>

<style lang="css">

</style>
