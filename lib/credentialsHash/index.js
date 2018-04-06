const crypto = require('crypto');
const {crypto: c} = require('../../config');

exports.createHashPass = async password => {
	let salt = crypto.randomBytes(c.hash.length).toString('base64');
	let passwordHash = await new Promise((res, rej) => {
		crypto.pbkdf2(
			password,
			salt,
			c.hash.iterations,
			c.hash.length,
			c.algorithm,
			(err, result) => res(result.toString('base64'))
		);
	});

	return {salt, passwordHash};
}

exports.checkPass = async (password, hash, salt) => {
	return await new Promise((res, rej) => {
		crypto.pbkdf2(
			password,
			salt,
			c.hash.iterations,
			c.hash.length,
			c.algorithm,
			(err, result) => res(result.toString('base64'))
		)
	}) === hash;
}
