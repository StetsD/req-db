<template lang="html">
	<div class="ui secondary pointing menu">

		<section class="menu__wrapper" v-if="$store.getters['user/getUser']">
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
			<nuxt-link to="/worker" class="item">
				Рабочие
			</nuxt-link>
		</section>


	  <div class="right menu">
	    <div class="item" v-if="$store.getters['user/getUser']">
	      <div class="ui icon input">
	        <input type="text" placeholder="Поиск">
	        <i class="search link icon"></i>
	      </div>
	    </div>
		<a class="ui item" @click="$emit('logout')" v-if="$store.getters['user/getUser']">
	      Выйти
	    </a>
	    <a class="ui item" @click="$emit('openLogin', 'login')" v-else>
	      Войти
	    </a>

	  </div>
	</div>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
.pointing.menu{
	display: flex;
	flex-wrap: wrap;

	& .item{
		font-size: 12px;
	}
}

.menu__wrapper{
	display: flex;
}
</style>
