<template lang="html">
	<form class="ui form">
	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="name" placeholder="Иван Иванов">
	  </div>
	  <div class="field">
	    <label>Возраст</label>
	    <input type="text" name="age" placeholder="34">
	  </div>
	  <div class="actions">
	    <div class="ui black deny button" @click="$emit('close')">{{cancel}}
	    </div>
	    <div class="ui positive right labeled icon button">{{ok}}
	      <i class="checkmark icon"></i>
	    </div>
	  </div>
	</form>
</template>

<script>
	export default {
		props: ['cancel', 'ok']
	}
</script>

<style lang="scss">

</style>
