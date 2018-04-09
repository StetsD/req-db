<template lang="html">
	<div class="tooltip"
		:class="$store.getters['tooltip/getTooltip'].status" @click="$store.dispatch('tooltip/callChangeState')">

		<div class="tooltip__inner">
			<p>{{$store.getters['tooltip/getTooltip'].msg}}</p>
		</div>

	</div>
</template>

<script>

export default {

}

</script>

<style lang="scss" scoped>
.tooltip{
	background-color: #838383;
	border-radius: 4px;
	padding: 20px;
	color: #ffffff;
	font-size: 14px;
	position: fixed;
	top: 20px;
	right: 20px;
	z-index: 100;
	visibility: hidden;
	opacity: 0;
	transition: all 0.3s ease-out;
	max-width: 34%;
	cursor: pointer;

	&.error{
		background-color: #db2828;
		visibility: visible;
		opacity: 1;
	}

	&.status{
		background-color: #2185d0;
		visibility: visible;
		opacity: 1;
	}

	&.success{
		background-color: #21ba45;
		visibility: visible;
		opacity: 1;
	}
}
</style>
