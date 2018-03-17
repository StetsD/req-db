<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Название</th>
				<th>Адрес</th>
				<th>Начальник</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in building_companies" :key="i">
				<td>{{item.id}}</td>
				<td>
					<nuxt-link :to="{path: `/building-company/${item.id}`}" append>{{item.name}}</nuxt-link>
				</td>
				<td>{{item.address}}</td>
				<td>{{item.boss.name}}</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['building_companies']
	}

</script>

<style lang="scss">

</style>
