const {router, apiPath} = require('./index');
const {getCustomerCompanies, getCustomerCompany, getCustomerCompaniesByName} = require('../db/models/customer-company');

router.get(apiPath('customer-company'), async (ctx, next) => {
	ctx.type = "application/json";

	if(ctx.request.query.q){
		ctx.body = await getCustomerCompaniesByName(ctx.request.query.q);
	}else{
		ctx.body = await getCustomerCompanies();
	}

	next();
});

router.get(apiPath('customer-company/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getCustomerCompany(ctx.params.id);
	next();
});
