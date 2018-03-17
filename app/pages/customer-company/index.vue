<template lang="html">
	<div class="">
		<Header title="Застройщики" sub="" icon="industry"/>
		<TableCustomerCompanies :customer_companies="customer_companies"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableCustomerCompanies from '~/components/tables/TableCustomerCompanies';

	const {tbody} = require('~/assets/table-schemas/customer-companies');

	export default {
		components: {Header, TableCustomerCompanies},
		data(){
			return {
				customer_companies: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
