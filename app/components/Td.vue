<template lang="html" >
	<td v-if="type == 'td'" :class="[classList ? classList : '']" v-html="content"></td>
	<th v-else :class="[classList ? classList : '']" v-html="content"></th>
</template>

<script>
	export default {
		props: ['content', 'classList', 'type']
	}
</script>

<style lang="scss">
</style>
