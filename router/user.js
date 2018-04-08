const {router, apiPath} = require('./index');
const {getUser, getMainInfoUser, addUser, verifyUser} = require('../db/models/user');
const {createHashPass} = require('../lib/credentialsHash');
const univalid = require('univalid')();
const passport = require('../lib/passport');
const {sendToken, checkToken} = require('../lib/verify');
const {client: rClient} = require('../lib/redis');

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
			ctx.status = 301;
			ctx.redirect('/');
		}
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
