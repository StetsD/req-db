<template>
	<div class="">
		<Menu/>
		<sui-container class="main">
			<nuxt/>
		</sui-container>
	</div>
</template>

<script type="text/javascript">
import Menu from '~/components/Menu';

const axios = require('axios');
const {port, api} = require('~/app-config');

axios.defaults.baseURL = `http://127.0.0.1:${port}/${api.name}/${api.version}`;

export default {
	components: {Menu}
}

</script>

<style lang="scss">
	@import '../assets/main.scss';

	.main{
		margin: 50px 0 0 0;
	}
</style>
