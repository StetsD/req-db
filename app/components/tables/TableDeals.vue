<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Клиент</th>
				<th>Строение</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in deals" :key="i">
				<td>{{item.id}}</td>
				<td>
					<nuxt-link :to="{path: `/client/${item.client.id}`}">{{item.client.name}}</nuxt-link>
				</td>
				<td>
					<nuxt-link :to="{path: `building/${item.building.id}`}">{{item.building.name}}</nuxt-link>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['deals']
	}

</script>

<style lang="scss">

</style>
