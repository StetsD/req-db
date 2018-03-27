<template lang="html">
	<form class="ui form js-form-add-cli form-client-add" :class="{active: visible}">
	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="name" placeholder="Иван Иванов"
			v-model="formData.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>
	  <div class="field">
	    <label>Возраст</label>
	    <input type="text" name="age" placeholder="34"
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
					$form: '.js-form-add-cli',
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
		},
		methods: {
			validate(){
				univalid.get('check');
				if(univalid.getCommonState === 'success'){
					this.$emit('add', this.formData);
				}

			}
		},
		watch: {
			visible: function(val){
				if(!val){
					this.formData = {name: '', age: ''};
					univalid.get('clearInputs');
					univalid.get('clearStatuses');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.form-client-add{
	display: none;

	&.active{
		display: block;
	}
}

</style>
