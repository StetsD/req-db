<template lang="html">
	<div class="">
		<CardClient :client="client"/>
	</div>
</template>

<script>
	import CardClient from '~/components/CardClient';

	const axios = require('axios');

	export default {
		components: {CardClient},
		async asyncData(ctx){

			try{
				var {data} = await axios(`client/${ctx.params.id}`);
			}catch(err){
				console.error(err);
			}

			return {
				client: data
			}
		}
	}
</script>

<style lang="css">
</style>
