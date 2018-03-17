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
