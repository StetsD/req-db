<template lang="html">
	<div class="ui form js-form-reg form-reg" :class="{active: visible}">

		<div class="ui message">
			<a @click="$emit('toggleForm', 'login')">Выполнить вход</a>
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
			<label>Email</label>
			<input
				type="email"
				name="email"
				v-model="email"
				data-validation="email">
			<div class="field__msg"></div>
		</div>

		<div class="field">
			<label>Пароль</label>
			<small>Пароль должен содержать лат.символы, цифры, заглавные буквы, спец.символы (мин 6 символов)</small>
			<input
				class="js-password-reg"
				type="password"
				name="password"
				v-model="password"
				data-validation="password"
				data-msg='{"invalid": "Пароль слишком простой"}'/>
			<div class="field__msg"></div>
		</div>

		<div class="ui indicating progress tiny js-progress-reg">
			<div class="bar"></div>
		</div>

		<div class="field">
			<label>Повторите пароль</label>
			<input
				type="password"
				name="password2"
				v-model="password2"
				data-validation="equal"
				data-msg='{"invalid": "Значения не совпадают"}'/>
			<div class="field__msg"></div>
		</div>

		<button class="ui button" @click="validate">Войти</button>
	</div>
</template>

<script>

const univalid = require('univalid')();
const USF = require('univalid-strategy-form');

let progress;

export default {
	props: ['visible'],
	data(){
		return {
			login: '',
			password: '',
			email: '',
			password2: ''
		}
	},
	mounted(){
		univalid.setStrategy(
			USF({
				core: univalid,
				$form: '.js-form-reg',
				statusConfig: {
					targetParent: '.field',
					targetStatus: '.field__msg'
				},
				checkPassScore: {
					target: '.js-password-reg',
					cb: val => {
						progress.progress('set percent', val > 100 ? 100 : val);
					}
				}
			})
		);
		univalid.toggleDefaultMsgConfig();

		progress = $('.js-progress-reg').progress();
	},
	methods: {
		validate(){
			univalid.get('check');
			if(univalid.getCommonState === 'success'){
				let {login, password, email} = this;
				this.$emit('reg', {login, password, email});
				setTimeout(()=>{
					this.$emit('togglePopupMsg', 'На вашу почту отправленно письмо с активацией аккаунта', 5000);
				}, 1000);
			}
		}
	},
	watch: {
		visible(){
			this.login = '';
			this.email = '';
			this.password = '';
			this.password2 = '';
			progress.progress('set percent', 0);
		}
	}
}

</script>

<style lang="scss" scoped>

.form-reg{
	display: none;
	&.active{
		display: block;
	}
	& a{
		cursor: pointer;
	}
}

</style>
