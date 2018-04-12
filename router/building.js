const {router, apiPath} = require('./index');
const {getBuildings, editBuilding, addBuilding, deleteBuilding, getBuildingByName} = require('../db/models/building');
const univalid = require('univalid')();

//get building
router.get(apiPath('building'), async (ctx, next) => {
	if(ctx.request.query.q){
		ctx.body = await getBuildingByName(ctx.request.query.q);
	}else{
		ctx.body = await getBuildings();
	}
});

//add building
router.post(apiPath('building'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		let {name, price} = ctx.request.body;
		let customer_company_id = ctx.request.body.customer;
		let building_company_id = ctx.request.body.builder;
		await addBuilding({name, price, customer_company_id, building_company_id});
		ctx.body = ctx.request.body;
	}else{
		ctx.throw({status: 400, msg: univalid.getState});
	}
});

//edit building
router.patch(apiPath('building'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		await editBuilding(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.throw({status: 400, msg: univalid.getState});
	}
});

//delete building
router.delete(apiPath('building/:id'), async (ctx, next) => {
	await deleteBuilding(ctx.params.id);
	ctx.status = 200;
	ctx.body = ctx.params;
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
