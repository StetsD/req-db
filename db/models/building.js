const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {buildingCompany} = require('./building-company');
const {customerCompany} = require('./customer-company');

const Building = db.define('building', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	price: {type: Sequelize.INTEGER, allowNull: false},
	customer_company_id: {type: Sequelize.INTEGER, allowNull: false},
	building_company_id: {type: Sequelize.INTEGER, allowNull: false}
});

Building.belongsTo(buildingCompany, {foreignKey: 'building_company_id'});
Building.belongsTo(customerCompany, {foreignKey: 'customer_company_id'});

exports.building = Building;

exports.getBuildings = async () => {
	return await Building.findAll({include:
		[
			{model: buildingCompany, required: true},
			{model: customerCompany, required: true}
		]
	});
}

exports.editBuilding = async data => {
	await db.query(`update buildings set
		(name, price, customer_company_id, building_company_id) = ('${data.name}','${data.price}','${data.customer}','${data.builder}')
		where id = ${data.id}`)
}
