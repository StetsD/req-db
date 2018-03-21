<template lang="html">
	<div class="ui modal" :class="{active: visible}">
	  <i class="close icon" @click="$emit('close')"></i>
	  <div class="header">{{header}}</div>
	  <div class="content">
		  <slot name="content"></slot>
	  </div>
	</div>
</template>

<script>
	export default {
		props: ['visible', 'header']
	}
</script>

<style lang="scss">

</style>
