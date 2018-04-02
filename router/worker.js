const {router, apiPath} = require('./index');
const {
	getWorkers,
	getSummWorkers} = require('../db/models/worker');
const univalid = require('univalid')();

//get workers
router.get(apiPath('worker'), async (ctx, next) => {
	ctx.body = await getSummWorkers();
	next();
});

//get worker
router.get(apiPath('worker/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getWorker(ctx.params.id);
	next();
});

//add worker
router.post(apiPath('worker'), async (ctx, next) => {
	if(validateWorker(ctx.request.body)){
		await addWorker(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});

//delete worker
router.delete(apiPath('worker/:id'), async (ctx, next) => {
	await deleteWorker(ctx.params.id);
	ctx.status = 200;
	ctx.body = ctx.params;
	next();
});

//edit worker
router.patch(apiPath('worker/:id'), async (ctx, next) => {
	// let {name, age} = ctx.request.body;
	if(validateWorker(ctx.request.body)){
		await editWorker({id: ctx.params.id, ...ctx.request.body});
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}
});


function validateWorker(body){
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
