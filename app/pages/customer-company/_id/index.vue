<template lang="html">
	<div class="">
		<Header title="Компания" sub="" icon="industry"/>
		<h4>Кол-во менеджеров</h4>
		<h2>Менеджеры</h2>
		<TableSellers :sellers="sellers"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableSellers from '~/components/tables/TableSellers';

	const {tbody} = require('~/assets/table-schemas/sellers');
	const axios = require('axios');

	export default {
		components: {Header, TableSellers},
		async asyncData(ctx){

			try{
				var {data} = axios(`/customer-company/${ctx.params.id}`);
			}catch(err){
				console.error(err);
			}

			return {
				sellers: data
			}
		}
	}

</script>

<style lang="css">

</style>
