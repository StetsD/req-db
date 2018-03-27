<template lang="html">
	<form class="ui form js-form-edit-building form-building-edit" :class="{active: visible}">

	  <div class="field">
	    <label>Имя</label>
	    <input type="text" name="name"
			ref="name"
			:value="building.name"
			data-validation="required"
			data-f="oC"
			data-msg='{"filter": "Разрешены только символы кириллицы"}'>
		<div class="field__msg"></div>
	  </div>

	  <div class="field">
	    <label>Цена</label>
	    <input type="text" name="price"
			ref="price"
			:value="building.price"
			data-validation="required"
			data-f="oN"
			data-msg='{"filter": "Разрешены только цифры"}'>
		<div class="field__msg"></div>
	  </div>

	 <div class="field">
		<label>Застройщик</label>
		 <div ref="cCompany" class="ui fluid search normal selection dropdown form-building-edit__cc">
		 	<input ref="cCompanyVal" type="hidden" name="customer" data-validation="required">
			<i class="dropdown icon "></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(comp, i) in companies" :key="i" :data-value="comp.id">{{comp.name}}</div>
			</div>
		</div>
	 	<div class="field__msg"></div>
	 </div>

	 <div class="field">
		<label>Подрядчик</label>
		 <div ref="bCompany" class="ui fluid search normal selection dropdown form-building-edit__bc">
		 	<input ref="bCompanyVal" type="hidden" name="builder" data-validation="required">
			<i class="dropdown icon"></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(comp, i) in bcompanies" :key="i" :data-value="comp.id">{{comp.name}}</div>
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


	export default {
		props: ['cancel', 'ok', 'visible', 'building', 'companies', 'bcompanies'],
		mounted(){
			$('.form-building-edit__cc, .form-building-edit__bc').dropdown({
				ignoreCase: true
			});

			this.$refs.cCompany.querySelector('.search').addEventListener('keyup',
				throttle((e) => {
					_fetchCompanies.apply(this, [e, 'cCompany', 'cCompanyChange']);
				}, 1500)
			, false);
			this.$refs.bCompany.querySelector('.search').addEventListener('keyup',
				throttle((e) => {
					_fetchCompanies.apply(this, [e, 'bCompany', 'bCompanyChange']);
				}, 1500)
			, false);

			univalid.setStrategy(
				USF({
					core: univalid,
					$form: '.js-form-edit-building',
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
					console.log({name: this.$refs.name.value,
					 price: this.$refs.price.value,
					 customer: this.$refs.cCompanyVal.value,
					 builder: this.$refs.bCompanyVal.value,
					 id: this.building.id})
					// this.$emit('edit',
					// 	{name: this.$refs.name.value,
					// 	 price: this.$refs.price.value,
					// 	 customer: this.$refs.cCompanyVal.value,
					// 	 builder: this.$refs.bCompanyVal.value,
					// 	 id: this.building.id});
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
			companies: function(){
				this.$refs.cCompany.classList.remove('loading');
			},
			bcompanies: function(){
				this.$refs.bCompany.classList.remove('loading');
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

.form-building-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
