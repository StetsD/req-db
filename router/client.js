const {router, apiPath} = require('./index');
const {getClients, getClient, addClient} = require('../db/models/client');
const univalid = require('univalid')();

router.get(apiPath('client'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClients();
	next();
});

router.get(apiPath('client/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClient(ctx.params.id);
	next();
});

router.post(apiPath('client'), async (ctx, next) => {
	univalid.check([
		{
			name: 'name',
			val: ctx.request.body.name,
			type: 'required',
			filter: 'oC'
		},
		{
			name: 'age',
			val: ctx.request.body.age,
			type: 'required',
			filter: 'oN'
		}
	]);
	if(univalid.getCommonState === 'success'){
		await addClient(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});
