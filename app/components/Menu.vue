<template lang="html">
	<div class="ui secondary pointing menu">

		<nuxt-link to="/" class="item">
			Главная
		</nuxt-link>
		<nuxt-link to="/client" class="item">
			Клиенты
		</nuxt-link>
		<nuxt-link to="/deal" class="item">
			Сделки
		</nuxt-link>
		<nuxt-link to="/building" class="item">
			Строения
		</nuxt-link>
		<nuxt-link to="/customer-company" class="item">
			Застройщики
		</nuxt-link>
		<nuxt-link to="/building-company" class="item">
			Подрядчики
		</nuxt-link>
		<nuxt-link to="/workers" class="item">
			Рабочие
		</nuxt-link>

	  <div class="right menu">
	    <div class="item">
	      <div class="ui icon input">
	        <input type="text" placeholder="Поиск">
	        <i class="search link icon"></i>
	      </div>
	    </div>
	    <a class="ui item">
	      Войти
	    </a>
	  </div>
	</div>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">

</style>
