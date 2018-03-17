<template lang="html">
	<div class="">
		<Header title="Компания" sub="" icon="industry"/>
		<h4>Кол-во менеджеров</h4>
		<h2>Менеджеры</h2>
		<TableSellers :sellers="sellers"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableSellers from '~/components/tables/TableSellers';

	const {tbody} = require('~/assets/table-schemas/sellers');

	export default {
		components: {Header, TableSellers},
		data(){
			return {
				sellers: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
