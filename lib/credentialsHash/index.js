const crypto = require('crypto');
const {crypto: c} = require('../../config');

exports.createHashPass = password => {
	let salt = crypto.randomBytes(c.hash.length).toString('base64');
	let passwordHash = crypto.pbkdf2Sync(
		password,
		salt,
		c.hash.iterations,
		c.hash.length,
		c.algorithm
	).toString('base64');

	return {salt, passwordHash};
}

exports.checkPass = (password, hash, salt) => {
	return crypto.pbkdf2Sync(
		password,
		salt,
		c.hash.iterations,
		c.hash.length,
		c.algorithm
	).toString('base64') === hash;
}
