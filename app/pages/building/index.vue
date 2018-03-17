<template lang="html">
	<div class="">
		<Header title="Строения" sub="" icon="building outline"/>
		<TableBuildings :buildings="buildings"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBuildings from '~/components/tables/TableBuildings';

	const {tbody} = require('~/assets/table-schemas/buildings');

	export default {
		components: {Header, TableBuildings},
		data(){
			return {
				buildings: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
