<template lang="html">
	<div class="">
		<Header title="Клиенты" sub="" icon="users"/>
		<Table :itemsHead="itemsHead" :itemsBody="itemsBody"/>
	</div>
</template>

<script>
	import Header from '~/components/Header';
	import Table from '~/components/Table';

	const {thead, tbody} = require('~/assets/table-schemas/users');

	export default {
		components: {Header, Table},
		data(){
			return {
				itemsHead: thead,
				itemsBody: tbody
			}
		}
	}

</script>

<style lang="css">

</style>
