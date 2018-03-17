<template lang="html">
	<div class="">
		<Header title="Сделки" sub="Клиенты и строения" icon="briefcase"/>
		<TableDeals :deals="deals"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableDeals from '~/components/tables/TableDeals';

	const {tbody} = require('~/assets/table-schemas/deals');

	export default {
		components: {Header, TableDeals},
		data(){
			return {
				deals: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
