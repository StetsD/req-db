const nodemailer = require('nodemailer');
const {pbkdf2} = require('crypto');
const config = require('../config');
const {host, port, auth} = config.mailer;
const {hash, algorithm} = config.crypto;
const {rSet, rGet, client: rClient} = require('./redis');
const {getUserByEmail} = require('../db/models/user');

let transporter = nodemailer.createTransport({host, port, auth, secure: true});

exports.sendToken = async (login, email) => {
	let token = await _createHash(login, email);

	await rSet(token, email);

	let options = {
		from: auth.user,
		to: email,
		text: 'Verify your account',
		html: `<html>
					<head></head>
					<body>
						<h1>Hello and Die</h1>
						<a href="http://localhost:${config.port}/verifying?token=${token}">VERIFY</a>
					</body>
				</html>`
	};

	transporter.sendMail(options, (err, info) => {
		if(err){
			return console.error(err);
		}

		console.log(`Letter has send: ${info.messageId}`);
	});
}

exports.checkToken = async (token) => {
	let email = await rGet(token);

	if(email){
		let user = await getUserByEmail(email);
		if(user){
			let {dataValues} = user;
			if(dataValues && !dataValues.verify){
				let checkToken = await _createHash(dataValues.login, dataValues.email);
				return {checkStatus: token === checkToken, email};
			}else{
				return {checkStatus: false};
			}
		}else{
			return {checkStatus: false};
		}
	}else{
		return {checkStatus: false};
	}
}

async function _createHash(login, email){
	return await new Promise((res, rej) => {
		pbkdf2(
			email,
			(email + login).toString('base64'),
			hash.iterations,
			hash.length,
			algorithm,
			(err, result) => res(result.toString('hex'))
		);
	});
}
