<template lang="html">
	<div class="">
		<Header title="Застройщики" sub="" icon="industry"/>
		<TableCustomerCompanies :customer_companies="customer_companies"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableCustomerCompanies from '~/components/tables/TableCustomerCompanies';

	const axios = require('axios');

	export default {
		components: {Header, TableCustomerCompanies},
		async asyncData(){

			try{
				var {data} = axios('/customer-company');
			}catch(err){
				console.error(err);
			}

			return {
				customer_companies: data
			}
		}
	}

</script>

<style lang="css">

</style>
