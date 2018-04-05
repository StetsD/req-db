<template lang="html">
	<div class="ui form js-form-login form-login" :class="{active: visible}">

		<div class="ui ignored warning message">
			Если у вас нет аккаунта пройдите <a @click="$emit('toggleForm', 'reg')">регистрацию</a>
		</div>

		<div class="field">
			<label>Логин</label>
			<input
				type="text"
				name="login"
				v-model="login"
				data-validation="required"/>
			<div class="field__msg"></div>
		</div>

		<div class="field">
			<label>Пароль</label>
			<input
				type="password"
				name="password"
				v-model="password"
				data-validation="required"/>
			<div class="field__msg"></div>
		</div>
		<div ref="error" class="field__msg field__msg-common">{{logErr}}</div>
		<button class="ui button" @click="validate">Войти</button>
	</div>
</template>

<script>

const univalid = require('univalid')();
const USF = require('univalid-strategy-form');

export default {
	props: ['visible', 'logErr'],
	data(){
		return {
			login: '',
			password: ''
		}
	},
	mounted(){
		univalid.setStrategy(
			USF({
				core: univalid,
				$form: '.js-form-login',
				statusConfig: {
					targetParent: '.field',
					targetStatus: '.field__msg'
				}
			})
		);
		univalid.toggleDefaultMsgConfig();
	},
	methods: {
		validate(){
			univalid.get('check');
			if(univalid.getCommonState === 'success'){
				let {login, password} = this;
				this.$emit('login', {login, password});
			}
		}
	},
	watch: {
		visible(){
			this.login = '';
			this.password = '';
		},
		logErr(val){

		}
	}
}

</script>

<style lang="scss" scoped>

.form-login{
	display: none;

	& .ui.ignored.warning.message{
		display: block;
		& a {
			cursor: pointer;
		}
	}

	&.active{
		display: block;
	}

	.field__msg-common{
	    margin: 0 0 20px;
	}
}

</style>
