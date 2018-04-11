<template>
	<section class="ui container">
		<Header v-if="$store.getters['user/getUser']" title="Building 1.0.0" sub="Manage your building" icon="settings"/>
		<h1 class="ui header" v-if="$store.getters['user/getUser']">Привет, {{this.$store.getters['user/getUser'].name}}</h1>
		<nuxt-link to="/chat" v-if="$store.getters['user/getUser']" class="ui button blue">Войти в чат</nuxt-link>
	</section>
</template>

<script>
	import Header from '~/components/Header';

	export default {
		components: {Header}
	}


</script>

<style lang="scss" scoped>

</style>
