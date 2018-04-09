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
				return throwError(done, 'Имя пользователя является обязательным полем');
			}
			if(!password){
				return throwError(done, 'Пароль является обязательным полем');
			}

			try{
				var cUser = await getUser({login: username});
			}catch(err){
				console.error(new Error(err));
				return done(err);
			}

			if(cUser && await checkPass(password, cUser.dataValues.password, cUser.dataValues.salt)){
				return done(null, cUser.dataValues);
			}

			return throwError(done, 'Неверный пароль или Имя пользователя');
		}
	)
)


function throwError(done, msg){
	return done(null, false, {status: msg});
}
