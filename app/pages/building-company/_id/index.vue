<template lang="html">
	<div class="">
		<Header title="Компания" :sub="company.name" icon="cog"/>
		<h4>Адрес</h4>
		<h2>Начальник</h2>
		<TableBosses :boss="boss"/>
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
				var {data} = await axios(`/building-company/${ctx.params.id}`);
			}catch(err){
				console.error(err);
			}

			return {
				company: data,
				boss: data.boss,
				workers: data.workers
			}
		}
	}

</script>

<style lang="css">

</style>
