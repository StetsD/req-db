const {router, apiPath} = require('./index');
const {getDeals, addDeal, editDeal} = require('../db/models/deal');
const univalid = require('univalid')();

router.get(apiPath('deal'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getDeals();
	next();
});

router.post(apiPath('deal'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		await addDeal(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 401;
		ctx.body = univalid.getState;
	}
	next();
});

router.patch(apiPath('deal'), async (ctx, next) => {
	if(validate(ctx.request.body)){
		await editDeal(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 401;
		ctx.body = univalid.getState;
	}
	next();
});


function validate(body){
	univalid.check([
		{
			name: 'client_id',
			val: body.client_id,
			type: 'required'
		},
		{
			name: 'building_id',
			val: body.building_id,
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
