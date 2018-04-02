const {router, apiPath} = require('./index');
const {
	getBuildingCompanies,
	getBuildingCompany,
	getBuildingCompanyByName,
	deleteBuildingCompany,
	addBuildingCompany} = require('../db/models/building-company');
const {
	addBoss} = require('../db/models/boss');
const univalid = require('univalid')();

router.get(apiPath('building-company'), async (ctx, next) => {
	if(ctx.request.query.q){
		ctx.body = await getBuildingCompanyByName(ctx.request.query.q);
	}else{
		ctx.body = await getBuildingCompanies();
	}

	next();
});

router.get(apiPath('building-company/:id'), async (ctx, next) => {
	ctx.body = await getBuildingCompany(ctx.params.id);
	next();
});

router.post(apiPath('building-company'), async (ctx, next) => {
	let {boss, name, address} = ctx.request.body;
	let newComp = await addBuildingCompany({name, address});
	boss.building_company_id = newComp.id;
	await addBoss(boss);
	ctx.body = ctx.request.body;
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
