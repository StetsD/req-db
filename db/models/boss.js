const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Boss = db.define('boss', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER},
	experience: {type: Sequelize.INTEGER, allowNull: false},
	building_company_id: {type: Sequelize.INTEGER, allowNull: false}
});



exports.boss = Boss;

exports.getBosses = async () => {
	return await Boss.findAll();
}
