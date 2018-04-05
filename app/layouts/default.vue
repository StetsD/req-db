<template>
	<div class="">
		<Menu
			@openLogin="togglePopup"
			@logout="logout"
		/>
		<sui-container class="main">
			<nuxt/>
		</sui-container>
		<ModalDefault :visible="visibleModal" @close="togglePopup" :header="headerMsg">
			<FormLogin
				slot="content"
				@login="login"
				@toggleForm="toggleForm"
				:visible="vFLogin"
				:logErr="commonLogErr"
			/>
			<FormReg
				slot="content"
				@reg="reg"
				@toggleForm="toggleForm"
				:visible="vFReg"
			/>
		</ModalDefault>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
	</div>
</template>

<script type="text/javascript">
const $ = require('jquery');
import semantic from 'semantic-ui-css';
window.$ = window.jQuery = $;

import Menu from '~/components/Menu';
import ModalDefault from '~/components/modals/ModalDefault';
import ModalDimmer from '~/components/modals/ModalDimmer';
import FormLogin from '~/components/forms/FormLogin';
import FormReg from '~/components/forms/FormReg';

const axios = require('axios');
const API = require('~/assets/modules/api').default;
const {port, api, host, protocol} = require('../../config');
const univalid = require('univalid')();
univalid.setDefaultMsgConfig({
	empty: 'Значение не должно быть пустым',
    invalid: 'Нарушен формат ввода',
    filter: "Недопустимые символы",
    success: 'Успех'
});

axios.defaults.baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;

export default {
	components: {
		Menu,
		ModalDefault,
		ModalDimmer,
		FormLogin,
		FormReg
	},
	data(){
		return {
			//modal
			visibleModal: false,
			visibleDimmer: false,

			//forms
			vFLogin: false,
			vFReg: false,

			//data
			headerMsg: 'Вход',
			commonLogErr: ''
		}
	},
	methods: {
		togglePopup(type){
			this.visibleModal = !this.visibleModal;
			this.commonLogErr = '';
			this.toggleDimmer();

			this.toggleForm(type);
		},
		toggleDimmer(){
			this.visibleDimmer = !this.visibleDimmer;
		},
		toggleForm(type){
			this.vFLogin = false;
			this.vFReg = false;

			switch(type){
				case 'login':
					this.vFLogin = true;
					this.headerMsg = 'Вход';
					break;
				case 'reg':
					this.vFReg = true;
					this.headerMsg = 'Регистрация';
					break;
				default:
					this.vFLogin = false;
					this.vFReg = false;
					break;
			}
		},
		async login(data){
			let res = await API.login(data);

			if(res.status === 400){
				this.commonLogErr = res.data.status;
				return;
			}

			this.$store.commit('user/login', res.data);
			this.togglePopup();
		},
		async logout(){
			await API.logout();
			this.$store.commit('user/logout');
			window.location = '/';
		},
		async reg(data){
			await API.reg(data);
			this.togglePopup();
		}
	}
}

</script>

<style lang="scss">
	@import '../assets/main.scss';

	.main{
		margin: 50px 0 0 0;
	}
</style>
