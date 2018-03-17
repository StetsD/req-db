<template lang="html">
	<div class="ui card">
	  <div class="image">
	    <img src="/img/clients/default.png">
	  </div>
	  <div class="content">
	    <a class="header">{{name}}</a>
	    <div class="meta">
	      <span class="date"><strong>Возраст:</strong> {{age}}</span>
	    </div>
	    <div class="description">
	      ID {{id}} (No Info)
	    </div>
	  </div>
	  <div class="extra content">
	    <a>
	      <i class="user icon"></i>
	      22 Friends
	    </a>
	  </div>
	</div>
</template>

<script>
	export default {
		props: ['name', 'age', 'id']
	}
</script>

<style lang="css">
</style>
