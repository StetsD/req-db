<template lang="html">
	<div class="">
		<Header title="Компания" :sub="company.name" icon="industry"/>
		<h4>Кол-во менеджеров</h4>
		<h2>Менеджеры</h2>
		<TableSellers :sellers="company.sellers"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableSellers from '~/components/tables/TableSellers';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {Header, TableSellers},
		async asyncData(ctx){

			let {data} = await api.getCCompany(ctx.params.id);

			return {
				company: data || []
			}
		}
	}

</script>

<style lang="css">

</style>
