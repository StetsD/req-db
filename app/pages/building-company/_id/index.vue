<template lang="html">
	<div class="">
		<Header title="Компания" sub="" icon="cog"/>
		<h3>Адрес</h3>
		<TableClients :clients="clients"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableClients from '~/components/tables/TableClients';

	const {thead, tbody} = require('~/assets/table-schemas/users');

	export default {
		components: {Header, TableClients},
		data(){
			return {
				clients: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
