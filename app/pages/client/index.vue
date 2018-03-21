<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<button class="ui button green mini" @click="togglePopup">Добавить</button>
		<button class="ui button orange mini">Редактировать</button>
		<button class="ui button red mini">Удалить</button>
		<TableClients :clients="clients"/>

		<ModalDefault :visible="visibleMClients" @close="togglePopup"  header="Добавить клиента">
			<FormClient slot="content" @close="togglePopup" ok="ok" cancel="Отмена"/>
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
			}

		}
	}

</script>

<style lang="css">

</style>
