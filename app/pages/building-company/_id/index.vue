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

	const {tbody} = require('~/assets/table-schemas/bosses');
	const {tbodyW} = require('~/assets/table-schemas/workers');

	export default {
		components: {Header, TableBosses, TableWorkers},
		data(){ 
			return {
				bosses: tbody,
				workers: tbodyW
			}
		}
	}

</script>

<style lang="css">

</style>
