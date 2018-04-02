<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Имя</th>
				<th>Возраст</th>
				<th>Стаж</th>
				<th v-if="func">Действия</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="(item, i) in workers" :key="i">
				<td>{{item.id}}</td>
				<td>{{item.name}}</td>
				<td>{{item.age}}</td>
				<td>{{item.experience}}</td>
				<td v-if="func">
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
		props: ['workers', 'func']
	}

</script>

<style lang="scss">

</style>
