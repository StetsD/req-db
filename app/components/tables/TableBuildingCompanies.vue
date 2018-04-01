<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Название</th>
				<th>Адрес</th>
				<th>Начальник</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in companies" :key="i">
				<td>{{item.id}}</td>
				<td>
					<nuxt-link :to="{path: `/building-company/${item.id}`}" append>{{item.name}}</nuxt-link>
				</td>
				<td>{{item.address}}</td>
				<td>{{item.boss}}</td>
				<td>
					<button @click="$emit('edit', 'edit', item)" class="ui orange mini icon button">
						<i class="cog icon"></i>
					</button>
					<button @click="$emit('delete', item)" class="ui red mini icon button">
						<i class="trash icon"></i>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['companies']
	}

</script>

<style lang="scss">

</style>
