const {router, apiPath} = require('./index');
const {getClients, getClient} = require('../db/models/client');

router.get(apiPath('client'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClients();
	next();
});

router.get(apiPath('client/:id'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getClient(ctx.params.id);
	next();
});
