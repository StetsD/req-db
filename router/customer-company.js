const {router, apiPath} = require('./index');
const {
	getCustomerCompanies,
	addCustomerCompanies,
	getCustomerCompany,
	deleteCustomerCompany,
	editCustomerCompany,
	getCustomerCompaniesByName} = require('../db/models/customer-company');
const {
	addSellers,
	getSellersByCompanyId,
	addSeller,
	deleteSeller} = require('../db/models/seller');

const univalid = require('univalid')();

router.get(apiPath('customer-company'), async (ctx, next) => {
	if(ctx.request.query.q){
		ctx.body = await getCustomerCompaniesByName(ctx.request.query.q);
	}else{
		ctx.body = await getCustomerCompanies();
	}

	next();
});

router.get(apiPath('customer-company/:id'), async (ctx, next) => {
	let {id} = ctx.params;
	let sellers = await getSellersByCompanyId(id);
	let company = await getCustomerCompany(id);
	company.dataValues.sellers = sellers;
	ctx.body = company;
	next();
});

router.post(apiPath('customer-company'), async (ctx, next) => {
	if(_validate(ctx.request.body)){
		var {managers, name} = ctx.request.body;
		let newCC = await addCustomerCompanies({name});

		if(managers && Array.isArray(managers) && managers.length){
			managers = managers.map(function(item){
				item.customer_company_id = newCC.id;
				return item;
			});
			await addSellers(managers);
		}

		ctx.status = 200;
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});

router.patch(apiPath('customer-company'), async (ctx, next) => {
	if(_validate(ctx.request.body)){
		await editCustomerCompany(ctx.request.body);
		ctx.status = 200;
		ctx.body = ctx.request.body;
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}

	next();
});

router.delete(apiPath('customer-company/:id'), async (ctx, next) => {
	await deleteCustomerCompany(ctx.params.id);
	ctx.status = 200;
	ctx.body = ctx.params.id;
	next();
});

router.get(apiPath('customer-company/:id/sellers'), async (ctx, next) => {
	let {id} = ctx.params;
	ctx.body = await getSellersByCompanyId(id);
	next();
});

router.post(apiPath('customer-company/:id/sellers'), async (ctx, next) => {
	let {id} = ctx.params;
	ctx.body = await addSeller(ctx.request.body);
	next();
});

router.delete(apiPath('customer-company/:id/sellers/:sellerId'), async (ctx, next) => {
	let {sellerId} = ctx.params;
	await deleteSeller(sellerId);
	ctx.body = sellerId;
	next();
});

function _validate(body){
	univalid.check([
		{
			name: 'name',
			val: body.name,
			type: 'required',
			filter: 'oC'
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
