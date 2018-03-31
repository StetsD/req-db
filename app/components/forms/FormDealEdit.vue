<template lang="html">
	<form class="ui form js-form-edit-deal form-deal-edit" :class="{active: visible}">

	 <div class="field">
		<label>Клиент</label>
		 <div ref="client" class="ui fluid search normal selection dropdown form-deal-edit__client">
		 	<input ref="clientVal" type="hidden" name="client_id" data-validation="required">
			<i class="dropdown icon "></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(cli, i) in clients" :key="i" :data-value="cli.id">{{cli.name}}</div>
			</div>
		</div>
	 	<div class="field__msg"></div>
	 </div>

	 <div class="field">
		<label>Строение</label>
		 <div ref="building" class="ui fluid search normal selection dropdown form-deal-edit__building">
		 	<input ref="buildingVal" type="hidden" name="building_id" data-validation="required">
			<i class="dropdown icon"></i>
	        <div class="default text"></div>
	        <div class="menu">
				<div class="item" v-for="(build, i) in buildings" :key="i" :data-value="build.id">{{build.name}}</div>
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
		props: ['cancel', 'ok', 'visible', 'clients', 'buildings', 'deal'],
		mounted(){
			dropdowns = $('.form-deal-edit__client, .form-deal-edit__building').dropdown({
				ignoreCase: true
			});

			this.$refs.client.querySelector('.search').addEventListener('keyup',
				throttle((e) => {
					_fetchCompanies.apply(this, [e, 'client', 'clientChange']);
				}, 1500)
			, false);
			this.$refs.building.querySelector('.search').addEventListener('keyup',
				throttle((e) => {
					_fetchCompanies.apply(this, [e, 'building', 'buildingChange']);
				}, 1500)
			, false);

			univalid.setStrategy(
				USF({
					core: univalid,
					$form: '.js-form-edit-deal',
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
					this.$emit('edit',
						{client_id: this.$refs.clientVal.value,
						 building_id: this.$refs.buildingVal.value,
					 	 id: this.deal.id});
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
			clients: function(){
				this.$refs.client.classList.remove('loading');
			},
			buildings: function(){
				this.$refs.building.classList.remove('loading');
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

.form-deal-edit{
	display: none;

	&.active{
		display: block;
	}
}

</style>
