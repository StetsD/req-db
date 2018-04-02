<template lang="html">
	<form class="ui form js-form-edit-worker form-worker-edit" :class="{active: visible}">

	<div class="field">
   	   <label>Имя</label>
   	   <input type="text" name="name"
	   		ref="name"
   		   :value="worker.name"
   		   data-validation="required"
   		   data-f="oC"
   		   data-msg='{"filter": "Разрешены только символы кириллицы"}'>
   	   <div class="field__msg"></div>
   	</div>

	<div class="field">
   	   <label>Возраст</label>
   	   <input type="text" name="age"
	   		ref="age"
   		   :value="worker.age"
   		   data-validation="required"
   		   data-f="oN"
   		   data-msg='{"filter": "Разрешены только символы кириллицы"}'>
   	   <div class="field__msg"></div>
   	</div>

	<div class="field">
   	   <label>Стаж</label>
   	   <input type="text" name="experience"
	   		ref="experience"
   		   :value="worker.experience"
   		   data-validation="required"
   		   data-f="oN"
   		   data-msg='{"filter": "Разрешены только символы кириллицы"}'>
   	   <div class="field__msg"></div>
   	</div>

	 <div class="field">
		<label>Работает в:</label>
		 <div ref="company" class="ui fluid search multiple selection dropdown form-worker-edit__company">
		 	<input ref="companyVal" type="hidden" name="company_id" data-validation="required">
			<i class="dropdown icon"></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(comp, i) in companies" :key="i" :data-value="comp.building_company_id ? comp.building_company_id : comp.id">{{comp.name}}</div>
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
		props: ['cancel', 'ok', 'visible', 'companies', 'worker'],
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
			dropdowns = $('.form-worker-edit__company').dropdown({
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
					$form: '.js-form-edit-worker',
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
					let {companyVal, name, age, experience} = this.$refs;
					this.$emit('edit',
						{id: this.worker.id,
						name: name.value,
						age: age.value,
						experience: experience.value,
						companies: companyVal.value.split(',')});
					dropdowns.dropdown('clear');
				}
			}
		},
		watch: {
			visible: async function(val){
				if(!val){
					univalid.get('clearInputs');
					univalid.get('clearStatuses');
					dropdowns.dropdown('remove active');
					dropdowns.dropdown('remove selected');
				}else{
					dropdowns.find('.menu .item').click();
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

.form-worker-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
