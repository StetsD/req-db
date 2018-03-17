<template lang="html">
	<div class="">
		<Header title="Подрядчики" sub="" icon="cog"/>
		<TableBuildingCompanies :building_companies="building_companies"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBuildingCompanies from '~/components/tables/TableBuildingCompanies';

	const {tbody} = require('~/assets/table-schemas/building-companies');

	export default {
		components: {Header, TableBuildingCompanies},
		data(){
			return {
				building_companies: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
