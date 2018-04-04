const {router, apiPath} = require('./index');
const {getClients, getClient, addClient, deleteClient, editClient, getClientByName} = require('../db/models/client');
const univalid = require('univalid')();

//get clients
router.get(apiPath('client'), async (ctx, next) => {
	console.log(ctx.isAuthenticated());
	ctx.type = "application/json";
	if(ctx.request.query.q){
		ctx.body = await getClientByName(ctx.request.query.q);
	}else{
		ctx.body = await getClients();
	}

	next();
});

//get client
router.get(apiPath('client/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClient(ctx.params.id);
	next();
});

//add client
router.post(apiPath('client'), async (ctx, next) => {
	if(validateClient(ctx.request.body)){
		await addClient(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});

//delete client
router.delete(apiPath('client/:id'), async (ctx, next) => {
	await deleteClient(ctx.params.id);
	ctx.status = 200;
	ctx.body = ctx.params;
	next();
});

//edit client
router.patch(apiPath('client/:id'), async (ctx, next) => {
	// let {name, age} = ctx.request.body;
	if(validateClient(ctx.request.body)){
		await editClient({id: ctx.params.id, ...ctx.request.body});
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
			type: 'required',
			filter: 'oC'
		},
		{
			name: 'age',
			val: body.age,
			type: 'required',
			filter: 'oN'
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
