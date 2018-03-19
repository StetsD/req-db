<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<TableClients :clients="clients"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableClients from '~/components/tables/TableClients';

	const axios = require('axios');

	export default {
		components: {Header, TableClients},
		async asyncData(){

			try{
				var {data} = await axios('/client');
			}catch(err){
				console.error(err);
			}

			return {
				clients: data || []
			}
		}
	}

</script>

<style lang="css">

</style>
