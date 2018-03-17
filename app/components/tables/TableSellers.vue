<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Имя</th>
				<th>Возраст</th>
				<th>Застройщик</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in sellers" :key="i">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.age}}</td>
				<td>
					<nuxt-link :to="{path: `/customer-company/${item.customer_company.id}`}">{{item.customer_company.name}}</nuxt-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['sellers']
	}

</script>

<style lang="scss">

</style>
