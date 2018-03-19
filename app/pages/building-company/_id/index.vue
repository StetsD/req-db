<template lang="html">
	<div class="">
		<Header title="Компания" sub="" icon="cog"/>
		<h4>Адрес</h4>
		<h2>Начальник</h2>
		<TableBosses :bosses="bosses"/>
		<h2>Рабочие</h2>
		<TableWorkers :workers="workers"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableBosses from '~/components/tables/TableBosses';
	import TableWorkers from '~/components/tables/TableWorkers';

	const axios = require('axios');

	export default {
		components: {Header, TableBosses, TableWorkers},
		async asyncData(ctx){

			try{
				var {data} = axios(`/building-company/${ctx.params.id}`);
			}catch(err){
				console.error(err);
			}

			return {
				bosses: data,
				workers: data
			}
		}
	}

</script>

<style lang="css">

</style>
