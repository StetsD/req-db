<template lang="html">
	<div class="">
		<h2>Вы {{appData.name}}</h2>
		<hr>
		<br>
		<br>
		<form v-if="!appData.verify" class="form ui js-form-verify">
			<h3>Верификация</h3>
			<div class="field">
				<label>Email</label>
				<input
					type="email"
					name="email"
					v-model="email"
					data-validation="email">
				<div class="field__msg"></div>
			</div>
			<button class="ui button" @click="validate">Отправить</button>
		</form>
	</div>
</template>

<script>

import {getLocalData} from '~/assets/modules/local-store';
import api from '~/assets/modules/api';
const univalid = require('univalid')();
const USF = require('univalid-strategy-form');

export default {
	data(){
		return {
			appData: getLocalData(),
			email: ''

		}
	},
	mounted(){
		if(!this.appData.verify){
			this.$store.dispatch('tooltip/callChangeState', {msg: 'Ваш аккаунт не подтверждён. Отправьте письмо верификации на свой email', status: 'status'});
			univalid.setStrategy(
				USF({
					core: univalid,
					$form: '.js-form-verify',
					statusConfig: {
						targetParent: '.field',
						targetStatus: '.field__msg'
					}
				})
			);
			univalid.toggleDefaultMsgConfig();
		}
	},
	methods: {
		async validate(){
			univalid.get('check');
			if(univalid.getCommonState === 'success'){
				let {email} = this;
				try{
					let res = await api.verifyPost({email});
					this.$store.dispatch('tooltip/callChangeState', {msg: res.data.status, status: res.status !== 200 ? 'error' : 'success'});
				}catch(err){
					this.$store.dispatch('tooltip/callChangeState', {msg: err.response.status, status: 'error'});
				}

			}
		},

	}
}

</script>

<style lang="scss">

</style>
