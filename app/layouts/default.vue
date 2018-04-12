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
				@togglePopupMsg="togglePopupMsg"
				:visible="vFReg"
				:regErr="commonRegErr"
			/>
		</ModalDefault>
		<ModalDefaultMsg
			 :visible="visibleModalMsg"
			 @close="togglePopupMsg"
			 :header="crossMsg"
		/>
		<ModalDimmer :visible="visibleDimmer" @close="togglePopup"/>
		<ModalDimmerMsg :visible="visibleDimmerMsg" @close="togglePopupMsg"/>
		<TooltipGlobal/>
	</div>
</template>

<script type="text/javascript">
const $ = require('jquery');
import semantic from 'semantic-ui-css';
window.$ = window.jQuery = $;

import Menu from '~/components/Menu';
import ModalDefault from '~/components/modals/ModalDefault';
import ModalDefaultMsg from '~/components/modals/ModalDefault';
import ModalDimmer from '~/components/modals/ModalDimmer';
import ModalDimmerMsg from '~/components/modals/ModalDimmer';
import FormLogin from '~/components/forms/FormLogin';
import FormReg from '~/components/forms/FormReg';
import TooltipGlobal from '~/components/TooltipGlobal';

const axios = require('axios');
const API = require('~/assets/modules/api').default;
const {port, api, host, protocol, io} = require('../../config');
const {IO, disconnect, connect} = require('~/assets/modules/socket-io-cli');
const univalid = require('univalid')();
univalid.setDefaultMsgConfig({
	empty: 'Значение не должно быть пустым',
    invalid: 'Нарушен формат ввода',
    filter: "Недопустимые символы",
    success: 'Успех'
});

axios.defaults.baseURL = `${protocol}://${host}:${port}/${api.name}/${api.version}`;
axios.defaults.headers.common['Data-type'] = 'query';

if($nuxt.$store.getters['user/getUser']){
	connect();
}

export default {
	components: {
		Menu,
		ModalDefault,
		ModalDefaultMsg,
		ModalDimmer,
		ModalDimmerMsg,
		FormLogin,
		FormReg,
		TooltipGlobal
	},
	data(){
		return {
			//modal
			visibleModal: false,
			visibleModalMsg: false,
			visibleDimmer: false,
			visibleDimmerMsg: false,

			//forms
			vFLogin: false,
			vFReg: false,

			//data
			headerMsg: 'Вход',
			commonLogErr: '',
			commonRegErr: '',
			crossMsg: ''
		}
	},
	async created(){
		if(this.$store.getters['user/getUser'] !== null){
			await this.$store.dispatch('user/getCurrentUser');
		}
	},
	methods: {
		togglePopup(type){
			this.visibleModal = !this.visibleModal;
			this.commonLogErr = '';
			this.commonRegErr = '';
			this.toggleDimmer();

			this.toggleForm(type);
		},
		togglePopupMsg(msg, time){
			this.crossMsg = msg || '';
			this.visibleModalMsg = !this.visibleModalMsg;
			this.visibleDimmerMsg = !this.visibleDimmerMsg;
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

			this.$store.commit('user/login', {name: res.data.login, verify: res.data.verify});
			connect();
			this.togglePopup();
		},
		async logout(){
			disconnect();
			await API.logout();
			this.$store.commit('user/logout');
		},
		async reg(data){
			let res = await API.reg(data);
			if(res.status === 200){
				this.togglePopup();
				setTimeout(()=>{
					this.togglePopupMsg('На вашу почту отправленно письмо с активацией аккаунта', 5000);
				}, 1000);
			}
			if(res.status === 400){
				this.commonRegErr = res.data;
			}
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
