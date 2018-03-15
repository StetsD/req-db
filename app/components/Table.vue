<template lang="html">
	<table class="ui celled table">
	  <thead>
	  	<Tr v-for="item in itemsHead" :key="item.id" items="item.tds"/>
	  </thead>
	  <tbody>
	  	<Tr v-for="item in itemsBody" :key="item.id" items="item.tds"/> 
	  </tbody>
	</table>
</template>

<script>
	import Tr from '~/components/Tr';

	export default {
		components: {Tr},
		props: ['itemsHead', 'itemsBody']
	}

</script>

<style lang="scss">

</style>
