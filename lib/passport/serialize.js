const passport = require('koa-passport');
const {user, getUser} = require('../../db/models/user');

passport.serializeUser((user, done) => {
	let {role, login} = user;
	done(null, {role, login});
});

passport.deserializeUser(async ({role, login}, done)=>{
	try{
		let user = await getUser({role, login});
		done(null, user.dataValues);
	}catch(err){
		done(err, null);
	}

});
