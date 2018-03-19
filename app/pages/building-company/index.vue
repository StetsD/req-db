<template lang="html">
	<div class="">
		<Header title="Подрядчики" sub="" icon="cog"/>
		<TableBuildingCompanies :building_companies="building_companies"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBuildingCompanies from '~/components/tables/TableBuildingCompanies';
	
	const axios = require('axios');

	export default {
		components: {Header, TableBuildingCompanies},
		async asyncData(){

			try{
				var {data} = axios('/building-company');
			}catch(err){
				console.error(err);
			}

			return {
				building_companies: data
			}
		}
	}

</script>

<style lang="css">

</style>
