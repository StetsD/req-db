<template lang="html">
	<form class="ui form js-form-edit-ccompany form-ccompany-edit" :class="{active: visible}">

	  <div class="field">
	    <label>Название Организации</label>
	    <input ref="companyName" type="text" name="name"
			v-model="company.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">


		<form class="ui two column grid form mini form-managers js-form-managers-edit">
			<div class="row">
				<div class="column">
					<div class="field">
		 				<label>Имя</label>
		 			 	<input
							v-model="managerName"
							name="manName"
							data-validation="manForm"
							data-f="oC"
							data-msg='{"filter": "Разрешены только символы кириллицы"}'>
						<div class="field__msg"></div>
		 		   </div>
		 		   <div class="field">
		 				<label>Возраст</label>
		 				<input
							v-model="managerAge"
							name="manAge"
							data-validation="manForm"
							data-f="oN"
							data-msg='{"filter": "Разрешены только Цифры"}'>
						<div class="field__msg"></div>
		 		   </div>
				   <div @click="addManager" class="ui mini button">Добавить манагера</div>
				</div>
				<div class="column">
					<h3>Персонал</h3>
					<div class="divider ui"></div>
					<div v-for="(man, i) in sellers" :key="i" class="ui label form-managers__tag">
						<i class="user icon"></i>
						{{man.name}}
						<i class="delete icon" @click="removeManager(man)"></i>
					</div>
				</div>

			</div>

	  	</form>

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
		props: ['cancel', 'ok', 'visible', 'sellers', 'company'],
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
					$form: '.js-form-edit-ccompany',
					statusConfig: {
						targetParent: '.field',
						targetStatus: '.field__msg'
					},
					keyLogger: true
				})
			);

			manForm.setStrategy(
				USF({
					core: manForm,
					$form: '.js-form-managers-edit',
					statusConfig: {
						targetParent: '.field',
						targetStatus: '.field__msg'
					},
					keyLogger: true
				})
			);
			manForm.setValidHandler({
				'manForm': val => {
					if(!val){
						return false;
					}
					return true;
				}
			});

			mForm.setMsgConfig(locMsgConf);
			manForm.setMsgConfig(locMsgConf);
		},
		methods: {
			validate(){
				mForm.get('check');
				if(mForm.getCommonState === 'success'){
					this.$emit('edit',
					{
						name: this.$refs.companyName.value,
						id: this.company.id
					});
				}
			},
			async addManager(){
				manForm.get('check');
				if(manForm.getCommonState === 'success'){
					let mergedData = {id: this.company.id, seller: {
						name: this.managerName,
						age: this.managerAge,
						customer_company_id: this.company.id
					}};

					await this.$emit('addSeller', mergedData);

					this.managerName = '';
					this.managerAge = '';
				}
			},
			removeManager(seller){
				let mergedData = {
					id: this.company.id,
					seller
				};
				this.$emit('deleteSeller', mergedData);
			}
		},
		watch: {
			visible: function(val){
				if(!val){
					this.managerName = '';
					this.managerAge = '';
					mForm.get('clearInputs');
					mForm.get('clearStatuses');
				}
			}
		}
	}
</script>

<style lang="scss" scoped>

.form-managers{
    margin: 0px 0 30px;

	&__tag{
	    margin: 0 2px 2px 0;
	}
}

.form-ccompany-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
