const {router, apiPath} = require('./index');
const {
	getBuildingCompanies,
	getBuildingCompany,
	getBuildingCompanyByName,
	editBuildingCompany,
	deleteBuildingCompany,
	addBuildingCompany} = require('../db/models/building-company');
const {
	getBoss,
	addBoss,
	editBoss} = require('../db/models/boss');
const {
	getWorkersByCompId} = require('../db/models/worker');
const univalid = require('univalid')();

router.get(apiPath('building-company'), async (ctx, next) => {
	if(ctx.request.query.q){
		ctx.body = await getBuildingCompanyByName(ctx.request.query.q);
	}else{
		ctx.body = await getBuildingCompanies();
	}
});

router.get(apiPath('building-company/:id'), async (ctx, next) => {
	ctx.body = await getBuildingCompany(ctx.params.id);
});

router.get(apiPath('building-company/:id/boss'), async (ctx, next) => {
	ctx.body = await getBoss(ctx.params.id);
});

router.get(apiPath('building-company/:id/worker'), async (ctx, next) => {
	ctx.body = await getWorkersByCompId(ctx.params.id);
});

router.post(apiPath('building-company'), async (ctx, next) => {
	let {boss, name, address} = ctx.request.body;
	if(_validateBCompany({name, address})){
		var newComp = await addBuildingCompany({name, address});
		boss.building_company_id = newComp.id;
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
	}

	if(_validateBoss(boss)){
		await addBoss(boss);
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
	}

	ctx.body = ctx.request.body;
});

router.patch(apiPath('building-company'), async (ctx, next) => {
	if(_validateBCompany(ctx.request.body)){
		await editBuildingCompany(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
	}
});

router.patch(apiPath('building-company/:id/boss'), async (ctx, next) => {
	if(_validateBoss(ctx.request.body)){
		await editBoss(ctx.request.body);
		ctx.body = ctx.request.body;
	}else{
		ctx.throw(400, {status: 400, msg: univalid.getState});
	}
});

router.delete(apiPath('building-company/:id'), async (ctx, next) => {
	await deleteBuildingCompany(ctx.params.id);
	ctx.body = ctx.params.id;
});

function _validateBCompany(body){
	univalid.check([
		{
			name: 'name',
			val: body.name,
			type: 'required',
			filter: 'oC'
		},
		{
			name: 'address',
			val: body.address,
			type: 'required',
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

function _validateBoss(body){
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
