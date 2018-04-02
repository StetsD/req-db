<template lang="html">
	<form class="ui form js-form-edit-bcompany form-bcompany-edit" :class="{active: visible}">

	  <div class="field">
	    <label>Название Организации</label>
	    <input ref="name" type="text" name="name"
			:value="company.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Адрес</label>
	    <input ref="address" type="text" name="address"
			:value="company.address"
			data-validation="required">
		<div class="field__msg"></div>
	  </div>

	  <h3>Бригадир организации</h3>
	  <div class="ui divider"></div>

	  <div class="field">
	    <label>Имя</label>
	    <input ref="boss_name" type="text" name="boss_name"
			:value="company.boss"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Возраст</label>
	    <input ref="age" type="text" name="age"
			:value="company.age"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Стаж</label>
	    <input ref="experience" type="text" name="experience"
			:value="company.exp"
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
		props: ['cancel', 'ok', 'visible', 'company'],
		data(){
			return {
				managerName: '',
				managerAge: ''
			}
		},
		mounted(){
			mForm.setStrategy(
				USF({
					core: mForm,
					$form: '.js-form-edit-bcompany',
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
					let {name, age, boss_name, address, experience} = this.$refs;
					this.$emit('edit', {
						name: name.value,
						address: address.value,
						boss: {
							name: boss_name.value,
							age: age.value,
							experience: experience.value
						}
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.form-bcompany-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
