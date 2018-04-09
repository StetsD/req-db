const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const User = db.define('user', {
	id: {type: Sequelize.INTEGER, autoIncrement: true},
	login: {type: Sequelize.STRING, primaryKey: true, unique: true, allowNull: false},
	email: {type: Sequelize.STRING, unique: true, allowNull: false},
	password: {type: Sequelize.STRING, allowNull: false},
	salt: {type: Sequelize.STRING, allowNull: false},
	role: {type: Sequelize.INTEGER, allowNull: false},
	verify: {type: Sequelize.INTEGER, defaultValue: 0}
});

exports.user = User;

exports.getUser = async props => {
	return await User.findOne({where: {login: props.login}});
}

exports.getUserByEmail = async email => {
	return await User.findOne({where: {email}});
}

exports.getMainInfoUser = async login => {
	return await db.query(`select login, email, verify from users where login = '${login}' limit 1;`, {
		type: db.QueryTypes.SELECT
	});
}

exports.addUser = async data => {
	return await User.create(data);
}

exports.verifyUser = async email => {
	return await db.query(`update users set verify = 1 where email = '${email}';`, {
		type: db.QueryTypes.SELECT
	});
}
