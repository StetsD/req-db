const passport = require('koa-passport');
const {user, getUser} = require('../../db/models/user');

passport.serializeUser((user, done) => {
	done(null, user.login);
});

passport.deserializeUser(async (login, done)=>{
	try{
		let user = await getUser(login);
		done(null, user.dataValues);
	}catch(err){
		done(err, null);
	}

});
