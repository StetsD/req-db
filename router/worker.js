const {router, apiPath} = require('./index');
const {
	getWorkers,
	getWorker,
	addWorker,
	editWorker,
	getSummWorkers,
	deleteWorker} = require('../db/models/worker');
const {
	addWorkerRelation,
	getCompaniesByWorkerId,
	deleteWorkerRelation} = require('../db/models/worker-to-company');

const univalid = require('univalid')();
const {pick} = require('lodash');

//get workers
router.get(apiPath('worker'), async (ctx, next) => {
	ctx.body = await getWorkers();
	next();
});

//get worker
router.get(apiPath('worker/:id'), async (ctx, next) => {
	let {id} = ctx.params;
	let companies = await getCompaniesByWorkerId(id);
	let worker = await getWorker(id);
	worker.dataValues.companies = companies;
	ctx.body = worker;
	next();
});

//add worker
router.post(apiPath('worker'), async (ctx, next) => {
	if(_validateWorker(ctx.request.body)){
		let newWorker = await addWorker(pick(ctx.request.body, ['name', 'age', 'experience']));
		let {companies} = ctx.request.body;

		if(companies && companies.length){
			let prepareRelation = [];
			companies.forEach(compId => {
				prepareRelation.push({
					worker_id: newWorker.id,
					building_company_id: compId
				});
			});
			await addWorkerRelation(prepareRelation);
		}

		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});

router.patch(apiPath('worker'), async (ctx, next) => {
	if(_validateWorker(ctx.request.body)){
		var {id, age, experience, name} = ctx.request.body
		await editWorker({id, age, experience, name});
		let {companies} = ctx.request.body;

		await deleteWorkerRelation(id);

		if(companies && companies.length){
			let prepareRelation = [];
			companies.forEach(compId => {
				prepareRelation.push({
					worker_id: id,
					building_company_id: compId
				});
			});
			await addWorkerRelation(prepareRelation);
		}

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
	if(_validateWorker(ctx.request.body)){
		await editWorker({id: ctx.params.id, ...ctx.request.body});
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}
});


function _validateWorker(body){
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
		},
		{
			name: 'experience',
			val: body.experience,
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
