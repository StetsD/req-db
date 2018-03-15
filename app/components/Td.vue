<template lang="html" >

	<td :class="[item.classList ? item.classList : '']">{{item.content}}</td>


</template>

<script>
	export default {
		props: ['items', 'type']
	}
</script>

<style lang="scss">
</style>
