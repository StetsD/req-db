const {router, apiPath} = require('./index');
const {getBuildingCompanies, getBuildingCompany} = require('../db/models/building-company');

router.get(apiPath('building-company'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getBuildingCompanies();
	next();
});

router.get(apiPath('building-company/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getBuildingCompany(ctx.params.id);
	next();
});
