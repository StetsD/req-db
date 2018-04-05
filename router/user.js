const {router, apiPath} = require('./index');
const {getUser, getMainInfoUser, addUser} = require('../db/models/user');
const {createHashPass, checkPass} = require('../lib/credentialsHash');
const univalid = require('univalid')();
const passport = require('../lib/passport');

router.post(apiPath('reg'), async (ctx, next) => {
	if(_validate(ctx.request.body)){
		let {login, email, password} = ctx.request.body;
		let {salt, passwordHash} = createHashPass(password);
		let role = login === 'admin' ? 0 : 1;

		await addUser({
			login,
			email,
			password: passwordHash,
			salt,
			role
		});

		ctx.status = 200;
		ctx.body = {status: `User ${login} registered`};
	}else{
		ctx.status = 400;
		ctx.body = univalid.getState;
	}
});

router.post(apiPath('login'), async (ctx, next) => {
	await passport.authenticate('local', async (err, user, msg) => {
		if(err) return new Error(msg);
		if(!user){
			ctx.status = 400;
			ctx.body = msg;
			return next();
		}

		try{
			await ctx.logIn(user);
			let userData = await getMainInfoUser(user.login);
			ctx.body = userData[0];
		}catch(err){
			ctx.status = 500;
			ctx.body = err;
		}

		next();
	})(ctx, next);
});

router.post(apiPath('logout'), async (ctx, next) => {
	ctx.logout();
	ctx.status = 200;
	ctx.body = {status: 'logout'};
});


function _validate(body){
	univalid.check([
		{
			name: 'login',
			val: body.login,
			type: 'required'
		},
		{
			name: 'email',
			val: body.email,
			type: 'email'
		},
		{
			name: 'password',
			val: body.password,
			type: 'password'
		}
	]);
	let state = univalid.getCommonState;
	if(state === 'success'){
		univalid.clearState();
		return true;
	}else{
		return false;
	}
}
