<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<button class="ui button green mini" @click="togglePopup">Добавить</button>
		<button class="ui button orange mini">Редактировать</button>
		<button class="ui button red mini">Удалить</button>
		<TableClients :clients="clients"/>

		<ModalDefault :visible="visibleMClients">
			<FormClient slot="content"/>
		</ModalDefault>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableClients from '~/components/tables/TableClients';
	import ModalDefault from '~/components/modals/ModalDefault';
	import FormClient from '~/components/forms/FormCLient';

	const axios = require('axios');

	export default {
		components: {Header, TableClients, ModalDefault, FormClient},
		async asyncData(){

			try{
				var {data} = await axios('/client');
			}catch(err){
				console.error(err);
			}

			return {
				visibleMClients: false,
				clients: data || []
			}
		},
		methods: {
			togglePopup(){
				this.visibleMClients = !this.visibleMClients;
			}
		}
	}

</script>

<style lang="css">

</style>
