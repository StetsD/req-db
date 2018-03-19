<template lang="html">
	<div class="">
		<Header title="Сделки" sub="Клиенты и строения" icon="briefcase"/>
		<TableDeals :deals="deals"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import TableDeals from '~/components/tables/TableDeals';

	const axios = require('axios');

	export default {
		components: {Header, TableDeals},
		async asyncData(){

			try{
				var {data} = await axios('/deal');
			}catch(err){
				console.error(err);
			}

			return {
				deals: data
			}
		}
	}

</script>

<style lang="css">

</style>
