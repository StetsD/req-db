const localStrategy = require('passport-local');
const passport = require('passport');
const {user, getUser} = require('../../db/models/user');

passport.use(new localStrategy(
		{
			usernameField: 'login',
			passwordField: 'password'
		},
		async (username, password, done) => {

			try{
				var cUser = await getUser(username);
			}catch(err){
				console.error(new Error(err));
				return done(err);
			}

			if(cUser && cUser.dataValues.password === password){
				return done(null, cUser.dataValues);
			}

			return done(null, false, {errors: {common: 'Неверный пароль или Имя пользователя'}});
		}
	)
)
