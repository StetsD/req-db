<template lang="html">
	<table class="table ui celled">
		<thead>
			<tr>
				<th>id</th>
				<th>Имя</th>
				<th>Возраст</th>
				<th>Стаж</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{boss.id}}</td>
				<td>{{boss.name}}</td>
				<td>{{boss.age}}</td>
				<td>{{boss.experience}} лет</td>
			</tr>
		</tbody>
	</table>
</template>

<script>

	export default {
		props: ['boss']
	}

</script>

<style lang="scss">

</style>
