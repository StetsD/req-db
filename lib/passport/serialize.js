const passport = require('koa-passport');
const {user, getUser} = require('../../db/models/user');

passport.serializeUser((user, done) => {
	done(null, user.login);
});

passport.deserializeUser(async (login, done)=>{
	console.log('AAAAAAAAA deserializeUser', login);
	try{
		let user = await getUser(login);
		done(null, user.dataValues);
	}catch(err){
		done(err, null);
	}

});
