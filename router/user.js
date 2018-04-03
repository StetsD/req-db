const {router, apiPath} = require('./index');
const {getUser} = require('../db/models/user');
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
			await ctx.login(user);
			ctx.body = {status: 'success'};
		}catch(err){
			ctx.status = 500;
			ctx.body = err;
		}

		next();
	})(ctx, next);


});
