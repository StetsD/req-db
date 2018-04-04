const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const User = db.define('user', {
	id: {type: Sequelize.INTEGER, autoIncrement: true},
	login: {type: Sequelize.STRING, primaryKey: true, unique: true, allowNull: false},
	email: {type: Sequelize.STRING, unique: true, allowNull: false},
	password: {type: Sequelize.STRING, allowNull: false},
	role: {type: Sequelize.INTEGER, allowNull: false}
});

exports.user = User;

exports.getUser = async login => {
	return await User.findOne({where: {login}});
}

exports.getMainInfoUser = async login => {
	return await db.query(`select login, email from users where login = '${login}' limit 1;`, {
		type: db.QueryTypes.SELECT
	});
}

exports.addUser = async data => {
	// return await Deal.findAll({include: [{model: client, required: true}, {model: building, required: true}]});
}

exports.editUser = async data => {
	// return await db.query(`update deals set
	// 			(client_id, building_id) = ('${data.client_id}', '${data.building_id}')
	// 			where id = ${data.id}`, {
	// 				type: db.QueryTypes.SELECT
	// 			});
};
