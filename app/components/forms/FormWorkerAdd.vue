<template lang="html">
	<form class="ui form js-form-add-worker form-worker-add" :class="{active: visible}">

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
   		   data-msg='{"filter": "Разрешены только символы кириллицы"}'>
   	   <div class="field__msg"></div>
   	</div>

	<div class="field">
   	   <label>Стаж</label>
   	   <input type="text" name="experience"
   		   v-model="formData.experience"
   		   data-validation="required"
   		   data-f="oN"
   		   data-msg='{"filter": "Разрешены только символы кириллицы"}'>
   	   <div class="field__msg"></div>
   	</div>

	 <div class="field">
		<label>Работает в:</label>
		 <div ref="company" class="ui fluid search multiple selection dropdown form-worker-add__company">
		 	<input ref="companyVal" type="hidden" name="company_id" data-validation="required">
			<i class="dropdown icon"></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(comp, i) in companies" :key="i" :data-value="comp.id">{{comp.name}}</div>
			</div>
		</div>
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
	const {throttle} = require('lodash');
	let dropdowns;

	export default {
		props: ['cancel', 'ok', 'visible', 'companies'],
		data(){
			return {
				formData: {
					name: '',
					age: '',
					experience: ''
				}
			}
		},
		mounted(){
			dropdowns = $('.form-worker-add__company').dropdown({
				className: {
					filtered: ''
				}
			});

			this.$refs.company.querySelector('.search').addEventListener('keyup',
				throttle((e) => {
					_fetchCompanies.apply(this, [e, 'company', 'companyChange']);
				}, 1000)
			, false);

			univalid.setStrategy(
				USF({
					core: univalid,
					$form: '.js-form-add-worker',
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
					let {companyVal} = this.$refs;
					this.$emit('add',
						{companies: companyVal.value.split(','), ...this.formData});
					dropdowns.dropdown('clear');
				}
			}
		},
		watch: {
			visible: function(val){
				if(!val){
					univalid.get('clearInputs');
					univalid.get('clearStatuses');
				}
			},
			companies: function(vak){
				this.$refs.company.classList.remove('loading');
			}
		}
	}

	function _fetchCompanies(e, type, method){
		let val = e.target.value;
		if(val.length >= 2){
			this.$refs[type].classList.add('loading');
			this.$emit(method, val);
		}
	}
</script>

<style lang="scss" scoped>

.form-worker-add{
	display: none;

	&.active{
		display: block;
	}
}

</style>
