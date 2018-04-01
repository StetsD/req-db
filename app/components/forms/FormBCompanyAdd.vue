<template lang="html">
	<form class="ui form js-form-add-bcompany form-bcompany-add" :class="{active: visible}">

	  <div class="field">
	    <label>Название Организации</label>
	    <input type="text" name="name"
			v-model="formData.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Адрес</label>
	    <input type="text" name="address"
			v-model="formData.address"
			data-validation="required">
		<div class="field__msg"></div>
	  </div>

	  <h3>Бригадир организации</h3>
	  <div class="ui divider"></div>

	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="boss_name"
			v-model="formData.boss.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Возраст</label>
	    <input type="text" name="age"
			v-model="formData.boss.age"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Стаж</label>
	    <input type="text" name="experience"
			v-model="formData.boss.experience"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="ui divider"></div>

	  <div class="actions">
	    <div class="ui black deny button" @click="$emit('close')">{{cancel ? cancel : 'Отмена'}}
	    </div>
	    <div class="ui positive right labeled icon button" @click="validate">{{ok}}
	      <i class="checkmark icon"></i>
	  </div>
	  </div>
	</form>
</template>

<script>
	const mForm = require('univalid')();
	const manForm = require('univalid')();
	const USF = require('univalid-strategy-form');

	const locMsgConf = {
		empty: 'Поле обязательно для заполнения',
		invalid: 'Неправильный формат данных',
		filter: 'Недопустимые символы',
		success: 'ok'
	};


	export default {
		props: ['cancel', 'ok', 'visible'],
		data(){
			return {
				formData:{
					name: '',
					address: '',
					boss: {
						name: '',
						age: '',
						experience: ''
					}
				},
				managerName: '',
				managerAge: ''
			}
		},
		mounted(){
			mForm.setStrategy(
				USF({
					core: mForm,
					$form: '.js-form-add-bcompany',
					statusConfig: {
						targetParent: '.field',
						targetStatus: '.field__msg'
					},
					keyLogger: true
				})
			);

			mForm.setMsgConfig(locMsgConf);
		},
		methods: {
			validate(){
				mForm.get('check');
				if(mForm.getCommonState === 'success'){
					this.$emit('add', this.formData);
				}
			}
		},
		watch: {
			visible: function(val){
				if(!val){
					this.formData = {
						name: '',
						address: '',
						boss: {
							name: '',
							age: '',
							experience: ''
						}
					};
					mForm.get('clearInputs');
					mForm.get('clearStatuses');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.form-bcompany-add{
	display: none;

	&.active{
		display: block;
	}
}

</style>
