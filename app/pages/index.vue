<template>
	<section>
		<Header title="Building 1.0.0" sub="Manage your building" icon="settings"/>
		<Table/>
	</section>
</template>

<script>
	import Menu from '~/components/Menu';
	import Header from '~/components/Header';
	import Table from '~/components/Table';

	export default {
		components: {Menu, Header, Table}
	}


</script>

<style lang="scss">

</style>
