<template lang="html">
	<div class="">
		<CardClient :client="client"/>
	</div>
</template>

<script>
	import CardClient from '~/components/CardClient';

	const axios = require('axios');
	const api = require('~/assets/modules/api').default;

	export default {
		components: {CardClient},
		async asyncData(ctx){

			let {data} = await api.getClients(ctx.params.id);

			return {
				client: data
			}
		}
	}
</script>

<style lang="css">
</style>
