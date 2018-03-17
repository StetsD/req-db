<template lang="html">
	<table class="ui celled table">
	  <thead>
	  	<Tr v-for="(item, i) in itemsHead"
			:key="i"
			type="th"
			:items="item.items"
			:classList="item.classList"/>
	  </thead>
	  <tbody>
	  	<Tr v-for="(item, i) in itemsBody"
			:key="i"
			type="td"
			:items="item.items"
			:classList="item.classList"/>
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
