<template lang="html">

	<tr :class="[item.list ? item.list : '']">
		<Td v-for="item in items" :key="item.content" items="item.tds" type="item.type"/>
	</tr>



</template>

<script>

	//TODO https://stackoverflow.com/questions/40029856/nested-loop-in-vue

	import Td from '~/components/Td';

	export default {
		props: ['items']
	}
</script>

<style lang="scss">
</style>
