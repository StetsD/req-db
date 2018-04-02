<template lang="html">
	<div class="">
		<Header title="Рабочие" icon="users"/>
		<h2>Рабочие</h2>
		<TableWorkers :workers="workers"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableWorkers from '~/components/tables/TableWorkers';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {Header, TableWorkers},
		async asyncData(ctx){

			try{
				var {data} = await api.getWorkers();
			}catch(err){
				console.error(err);
			}

			return {
				workers: data || []
			}
		}
	}

</script>

<style lang="css">

</style>
