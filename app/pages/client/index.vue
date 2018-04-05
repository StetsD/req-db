<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<button class="ui button green mini" @click="togglePopup('add')">Добавить</button>
		<TableClients @delete="deleteClient" @edit="togglePopup" :clients="clients"/>

		<ModalDefault :visible="visibleMClients" @close="togglePopup"  header="Клиент">
			<FormClientAdd
				:visible="vFClientsAdd"
				@add="addClient"
				slot="content"
				@close="togglePopup"
				ok="Добавить"
			/>
			<FormClientEdit
				:visible="vFClientsEdit"
				@edit="editClient"
				:client="editingClient"
				slot="content"
				@close="togglePopup"
				ok="Изменить"
			/>
		</ModalDefault>

		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableClients from '~/components/tables/TableClients';
	import ModalDefault from '~/components/modals/ModalDefault';
	import FormClientAdd from '~/components/forms/FormCLientAdd';
	import FormClientEdit from '~/components/forms/FormClientEdit';
	import ModalDimmer from '~/components/modals/ModalDimmer';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {Header,
					 TableClients,
					 ModalDefault,
					 FormClientAdd,
					 ModalDimmer,
				 	 FormClientEdit},
		async asyncData(){

			let {data} = await api.getClients();

			return {
				//modal
				visibleMClients: false,
				visibleDimmer: false,
				//forms
				vFClientsAdd: false,
				vFClientsEdit: false,
				//data
				clients: data || [],
				editingClient: {name: '', age: ''}
			}
		},
		methods: {
			togglePopup(type, client){
				this.visibleMClients = !this.visibleMClients;
				this.toggleDimmer();

				switch(type){
					case 'add':
						this.vFClientsAdd = true;
						break;
					case 'edit':
						this.editingClient = client;
						this.vFClientsEdit = true;
						break;
					default:
						this.vFClientsAdd = false;
						this.vFClientsEdit = false;
					 	break;
				}


			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addClient(formData){
				await api.addClient(formData);
				await this.getClients();
				this.togglePopup();
			},
			async editClient(formData){
				await api.editClient(formData);
				await this.getClients();
				this.togglePopup();
			},
			async deleteClient(client){
				await api.deleteClient(client.id);
				await this.getClients();
			},
			async getClients(){
				let {data} = await api.getClients();
				this.clients = data;
			}
		}
	}

</script>

<style lang="css">

</style>
