const {router, apiPath} = require('./index');
const {getUser, getMainInfoUser} = require('../db/models/user');
const univalid = require('univalid')();
const passport = require('../lib/passport');

//get clients
router.post(apiPath('login'), async (ctx, next) => {

	await passport.authenticate('local', async (err, user, msg) => {
		if(err) return new Error(msg);
		if(!user){
			ctx.status = 400;
			ctx.body = msg;
			return next();
		}

		try{
			console.log(ctx.isAuthenticated());
			await ctx.logIn(user);
			console.log(ctx.isAuthenticated());
			let userData = await getMainInfoUser(user.login);
			ctx.body = userData[0];
		}catch(err){
			ctx.status = 500;
			ctx.body = err;
		}

		next();
	})(ctx, next);


});
