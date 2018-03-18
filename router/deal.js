const {router, apiPath} = require('./index');
const {getDeals} = require('../db/models/client');

router.get(apiPath('deal'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getDeals();
	next();
});
