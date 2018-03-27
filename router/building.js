const {router, apiPath} = require('./index');
const {getBuildings, editBuilding} = require('../db/models/building');
const univalid = require('univalid')();

router.get(apiPath('building'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getBuildings();
	next();
});

router.post(apiPath('building'), async (ctx, next) => {
	if(validateClient(ctx.request.body)){
		await editBuilding(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}


});

function validateClient(body){
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
