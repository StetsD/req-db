<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
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
