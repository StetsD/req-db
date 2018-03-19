const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Building = db.define('building', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	price: {type: Sequelize.INTEGER, allowNull: false},
	customer_company_id: {type: Sequelize.INTEGER, allowNull: false},
	building_company_id: {type: Sequelize.INTEGER, allowNull: false}
});

exports.building = Building;

exports.getBuildings = async () => {
	return await Building.findAll();
}
