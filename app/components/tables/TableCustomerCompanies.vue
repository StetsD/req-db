<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Название</th>
				<th>Кол-во менеджеров</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in customer_companies" :key="i">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.stuff}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['customer_companies']
	}

</script>

<style lang="scss">

</style>
