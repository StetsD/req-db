<template>
	<section>
		<Header title="Building 1.0.0" sub="Manage your building" icon="settings"/>
		<h1 class="ui header" v-if="this.$store.getters['user/getUser']">Привет, {{this.$store.getters['user/getUser'].login}}</h1>
	</section>
</template>

<script>
	import Header from '~/components/Header';

	export default {
		components: {Header},
		data(){
			return {
				user: this.$store.getters['user/getUser']
			}
		}
	}


</script>

<style lang="scss">

</style>
