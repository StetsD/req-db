<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Имя</th>
				<th>Возраст</th>
				<th>Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(client, i) in clients" :key="i">
				<td>{{client.id}}</td>
				<td>
					<nuxt-link :to="{path: `${client.id}`}" append>{{client.name}}</nuxt-link>
				</td>
				<td>{{client.age}}</td>
				<td>
					<button @click="$emit('edit', 'edit', client)" class="ui orange mini icon button">
						<i class="cog icon"></i>
					</button>
					<button @click="$emit('delete', client)" class="ui red mini icon button">
						<i class="trash icon"></i>
					</button>
				</td>

			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['clients']
	}

</script>

<style lang="scss">

</style>
