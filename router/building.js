const {router, apiPath} = require('./index');
const {getBuildings, editBuilding, addBuilding} = require('../db/models/building');
const univalid = require('univalid')();

router.get(apiPath('building'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getBuildings();
	next();
});

router.post(apiPath('building'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		let {name, price} = ctx.request.body;
		let customer_company_id = ctx.request.body.customer;
		let building_company_id = ctx.request.body.builder;
		await addBuilding({name, price, customer_company_id, building_company_id});
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}
});

router.patch(apiPath('building'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		await editBuilding(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}
});

function validate(body){
	univalid.check([
		{
			name: 'name',
			val: body.name,
			type: 'required'
		},
		{
			name: 'price',
			val: body.price,
			type: 'required'
		},
		{
			name: 'customer',
			val: body.customer,
			type: 'required'
		},
		{
			name: 'builder',
			val: body.builder,
			type: 'required'
		}
	]);
	let state = univalid.getCommonState;
	if(state === 'success'){
		univalid.clearState();
		return true;
	}else{
		return false;
	}

}
