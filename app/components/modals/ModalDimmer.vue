<template lang="html">
	<div class="ui dimmer modals page transition" :class="{active: visible, visible}" @click="$emit('close')">

	</div>
</template>

<script>
export default {
	props: ['visible']
}
</script>

<style lang="css">
</style>
