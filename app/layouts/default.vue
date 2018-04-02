<template>
	<div class="">
		<Menu
			@openLogin="togglePopup"
		/>
		<sui-container class="main">
			<nuxt/>
		</sui-container>
		<ModalDefault :visible="visibleModal" @close="togglePopup" header="Логин">
			<FormLogin
				slot="content"
				@login="login"
				:visible="vFLogin"
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

const axios = require('axios');
const {port, api} = require('~/app-config');
const univalid = require('univalid')();
univalid.setDefaultMsgConfig({
	empty: 'Значение не должно быть пустым',
    invalid: 'Нарушен формат ввода',
    filter: "Недопустимые символы",
    success: 'Успех'
});

axios.defaults.baseURL = `http://127.0.0.1:${port}/${api.name}/${api.version}`;

export default {
	components: {
		Menu,
		ModalDefault,
		ModalDimmer,
		FormLogin
	},
	data(){
		return {
			//modal
			visibleModal: false,
			visibleDimmer: false,

			//forms
			vFLogin: false,
			vFReg: false
		}
	},
	methods: {
		togglePopup(type){
			this.visibleModal = !this.visibleModal;
			this.toggleDimmer();

			switch(type){
				case 'login':
					this.vFLogin = true;
					break;
				default:
					this.vFDealsAdd = false;
					this.vFDealsEdit = false;
					break;
			}
		},
		toggleDimmer(){
			this.visibleDimmer = !this.visibleDimmer;
		},
		async login(data){

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
