const {router, apiPath} = require('./index');
const {getUser, getMainInfoUser, addUser, verifyUser, getUserByEmail} = require('../db/models/user');
const {createHashPass} = require('../lib/credentialsHash');
const univalid = require('univalid')();
const passport = require('../lib/passport');
const {sendToken, checkToken} = require('../lib/verify');
const {client: rClient} = require('../lib/redis');
const {get, set} = require('lodash');

router.get(apiPath('user'), async (ctx, next) => {
	let user = get(ctx, 'session.passport.user', null);
	if(ctx.isAuthenticated() && user){
		ctx.body = {login: user.login, verify: user.verify};
	}
});

router.post(apiPath('reg'), async (ctx, next) => {
	if(_validate(ctx.request.body)){
		let {login, email, password} = ctx.request.body;
		let {salt, passwordHash} = await createHashPass(password);
		let role = login === 'admin' ? 0 : 1;

		await addUser({
			login,
			email,
			password: passwordHash,
			salt,
			role
		});

		await sendToken(login, email);

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

router.get('/verifying', async (ctx, next) => {
	let {token} = ctx.request.query;
	if(token){
		let {checkStatus, email} = await checkToken(token);

		if(!checkStatus){
			ctx.status = 400;
			ctx.body = {status: 'Bad Token'};
		}else{
			rClient.del(token);
			await verifyUser(email);
			set(ctx, 'session.passport.user.verify', 1);
			ctx.status = 301;
			ctx.redirect('/');
		}
	}else{
		ctx.status = 400;
		ctx.body = {status: 'Bad Token'};
	}
});

router.post(apiPath('verifying'), async (ctx, next) => {
	let {email} = ctx.request.body;
	let user = await getUserByEmail(email);
	let name = get(ctx, 'session.passport.user.login', null);
	
	if(user && user.dataValues.verify){
		ctx.status = 400;
		ctx.body = {status: 'Пользователь уже верефицирован'};
		return;
	}

	if(user && user.dataValues.login === name){
		await sendToken(name, email);
		ctx.status = 200;
		ctx.body = {status: 'На вашу почту вышло письмо с верификацией'};
	}else{
		ctx.status = 400;
		ctx.body = {status: 'Пользователь с таким email не найден'}
	}
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
