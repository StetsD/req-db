<template lang="html">
	<div class="ui modal" :class="{active: visible}">
	  <i class="close icon"></i>
	  <div class="header">
	    Profile Picture
	  </div>
	  <div class="content">
		  <slot name="content"></slot>
	  </div>
	  <div class="actions">
	    <div class="ui black deny button">
	      Отмена
	    </div>
	    <div class="ui positive right labeled icon button">
	      Ok
	      <i class="checkmark icon"></i>
	    </div>
	  </div>
	</div>
</template>

<script>
	export default {
		props: ['visible']
	}
</script>

<style lang="scss">

</style>
