const {router, apiPath} = require('./index');
const {getBuildings} = require('../db/models/building');

router.get(apiPath('building'), async (ctx, next) => {
	ctx.type = "application/json";
	ctx.body = await getBuildings();
	next();
});
