<template lang="html">
	<div class="">
		<Header title="Строения" sub="" icon="building outline"/>
		<TableBuildings :buildings="buildings"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBuildings from '~/components/tables/TableBuildings';

	const axios = require('axios');

	export default {
		components: {Header, TableBuildings},
		async asyncData(){

			try{
				var {data} = await axios('/building');
			}catch(err){
				console.error(err);
			}

			return {
				buildings: data
			}
		}
	}

</script>

<style lang="css">

</style>
