const localStrategy = require('passport-local');
const passport = require('passport');
const {user, getUser} = require('../../db/models/user');
const {checkPass} = require('../credentialsHash');

passport.use(new localStrategy(
		{
			usernameField: 'login',
			passwordField: 'password'
		},
		async (username, password, done) => {

			if(!username){
				return done(null, false, {errors: {common: 'Имя пользователя является обязательным полем'}});
			}
			if(!password){
				return done(null, false, {errors: {common: 'Пароль является обязательным полем'}});
			}

			try{
				var cUser = await getUser(username);
			}catch(err){
				console.error(new Error(err));
				return done(err);
			}

			let {password: hash, salt} = cUser.dataValues;

			if(cUser && checkPass(password, hash, salt)){
				return done(null, cUser.dataValues);
			}

			return done(null, false, {errors: {common: 'Неверный пароль или Имя пользователя'}});
		}
	)
)
