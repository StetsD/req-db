<template lang="html">

	<tr :class="[classList ? classList : '']">

		<Td v-for="(item, i) in items"
			:key="i"
			:classList="item.classList"
			:content="item.content"
			:type="type"
		/>

	</tr>



</template>

<script>
	import Td from '~/components/Td';

	export default {
		props: ['items', 'classList', 'type'],
		components: {Td}
	}
</script>

<style lang="scss">
</style>
