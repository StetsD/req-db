<template lang="html">
	<h2 class="ui header">
		  <i :class="[icon ? icon : '']" class="icon"></i>
		  <div class="content">
			  {{title}}
			  <div class="sub header">{{sub}}</div>
		  </div>
	</h2>
</template>

<script>
export default {
	props: ['title', 'sub', 'icon']
}
</script>

<style lang="css">

</style>
