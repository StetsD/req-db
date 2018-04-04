exports.init = app => app.use(async (ctx, next) => {
	if(ctx.isAuthenticated()){
		return next();
	}

	ctx.status = 401;
	ctx.body = {status: 'unauthorized'};

});
