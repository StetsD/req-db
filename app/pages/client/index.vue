<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<button class="ui button green mini" @click="togglePopup">Добавить</button>
		<TableClients @delete="deleteClient" :clients="clients"/>

		<ModalDefault :visible="visibleMClients" @close="togglePopup"  header="Добавить клиента">
			<FormClient
				@add="addClient"
				slot="content"
				@close="togglePopup"
				ok="Добавить"
				cancel="Отмена"/>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableClients from '~/components/tables/TableClients';
	import ModalDefault from '~/components/modals/ModalDefault';
	import FormClient from '~/components/forms/FormCLient';
	import ModalDimmer from '~/components/modals/ModalDimmer';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {Header, TableClients, ModalDefault, FormClient, ModalDimmer},
		async asyncData(){

			try{
				var {data} = await axios('/client');
			}catch(err){
				console.error(err);
			}

			return {
				visibleMClients: false,
				visibleDimmer: false,
				clients: data || []
			}
		},
		methods: {
			togglePopup(){
				this.visibleMClients = !this.visibleMClients;
				this.toggleDimmer();
			},
			toggleDimmer(){
				this.visibleDimmer = !this.visibleDimmer;
			},
			async addClient(formData){
				await api.addClient(formData);
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
