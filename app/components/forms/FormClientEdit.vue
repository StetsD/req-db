<template lang="html">
	<form class="ui form js-form-edit-cli form-client-edit" :class="{active: visible}">
	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="name"
			v-model="formData.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>
	  <div class="field">
	    <label>Возраст</label>
	    <input type="text" name="age"
			v-model="formData.age"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>
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
	const univalid = require('univalid')();
	const USF = require('univalid-strategy-form');


	export default {
		props: ['cancel', 'ok', 'visible'],
		data(){
			return {
				formData:{
					name: '',
					age: ''
				}
			}
		},
		mounted(){
			univalid.setStrategy(
				USF({
					core: univalid,
					$form: '.js-form-edit-cli',
					statusConfig: {
						targetParent: '.field',
						targetStatus: '.field__msg'
					},
					keyLogger: true,
					sendConfig: {

					},
				})
			);
			univalid.setMsgConfig({
				empty: 'Поле обязательно для заполнения',
				invalid: 'Неправильный формат данных',
				filter: 'Недопустимые символы',
				success: 'ok'
			});
			console.log(univalid.get('$form'))
		},
		methods: {
			validate(){
				univalid.get('check');
				if(univalid.getCommonState === 'success'){
					this.$emit('edit', this.formData);
				}

			}
		}
	}
</script>

<style lang="scss" scoped>

.form-client-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
