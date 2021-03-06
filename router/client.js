const {router, apiPath} = require('./index');
const {getClients, getClient, addClient, deleteClient, editClient, getClientByName} = require('../db/models/client');
const univalid = require('univalid')();

//get clients
router.get(apiPath('client'), async (ctx, next) => {
	if(ctx.request.query.q){
		ctx.body = await getClientByName(ctx.request.query.q);
	}else{
		ctx.body = await getClients();
	}
});

//get client
router.get(apiPath('client/:id'), async (ctx, next) => {
	ctx.body = await getClient(ctx.params.id);
});

//add client
router.post(apiPath('client'), async (ctx, next) => {
	if(validateClient(ctx.request.body)){
		let newClient = await addClient(ctx.request.body);
		ctx.body = newClient.dataValues;
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
	}
});

//delete client
router.delete(apiPath('client/:id'), async (ctx, next) => {
	await deleteClient(ctx.params.id);
	ctx.status = 200;
	ctx.body = ctx.params;
});

//edit client
router.patch(apiPath('client/:id'), async (ctx, next) => {
	if(validateClient(ctx.request.body)){
		await editClient({id: ctx.params.id, ...ctx.request.body});
		ctx.body = ctx.request.body;
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
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
