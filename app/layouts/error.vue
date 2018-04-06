<template>
	<div class="container">
		<h1 v-if="error.statusCode === 404">Страница не найдена</h1>
		<h1 v-else>Внутренняя ошибка сервера</h1>
		<nuxt-link to="/">Назад к главной странице</nuxt-link>
	</div>
</template>

<script>

export default {

	props: ['error']

}

</script>
