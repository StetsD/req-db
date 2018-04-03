const passport = require('koa-passport');
const {user, getUser} = require('../../db/models/user');

passport.serializeUser((user, done) => {
	done(null, user.login);
});

passport.deserializeUser((login, done)=>{
	getUser(login, done);
});
