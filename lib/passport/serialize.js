const passport = require('koa-passport');
const {user, getUser} = require('../../db/models/user');

passport.serializeUser((user, done) => {
	let {role, login, verify} = user;
	done(null, {role, login, verify});
});

passport.deserializeUser(async ({role, login, verify}, done)=>{
	try{
		let user = await getUser({role, login, verify});
		done(null, user.dataValues);
	}catch(err){
		done(err, null);
	}

});
