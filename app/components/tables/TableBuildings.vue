<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Название</th>
				<th>Цена</th>
				<th>Застройщик</th>
				<th>Подрядчик</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in buildings" :key="i">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.price}}</td>
				<td>
					<nuxt-link :to="{path: `/customer-company/${item.customer_company_id}`}">{{item.customer_company.name}}</nuxt-link>
				</td>
				<td>
					<nuxt-link :to="{path: `building-company/${item.building_company_id}`}">{{item.building_company.name}}</nuxt-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['buildings']
	}

</script>

<style lang="scss">

</style>
