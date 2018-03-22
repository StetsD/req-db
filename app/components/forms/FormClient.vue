<template lang="html">
	<form class="ui form js-form-add-cli">
	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="name" placeholder="Иван Иванов"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>
	  <div class="field">
	    <label>Возраст</label>
	    <input type="text" name="age" placeholder="34"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>
	  <div class="actions">
	    <div class="ui black deny button" @click="$emit('close')">{{cancel}}
	    </div>
	    <button type="submit" class="ui positive right labeled icon button" @click="validate">{{ok}}
	      <i class="checkmark icon"></i>
	  </button>
	  </div>
	</form>
</template>

<script>
	const univalid = require('univalid')();
	const USF = require('univalid-strategy-form');


	export default {
		props: ['cancel', 'ok'],
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
				// univalid.get('check');
				console.log(univalid.getState);
			}
		}
	}
</script>

<style lang="scss">

</style>
