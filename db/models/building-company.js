const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const BuildingCompany = db.define('building_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	address: {type: Sequelize.STRING},
	boss: {type: Sequelize.STRING, allowNull: false}
});

exports.buildingCompany = BuildingCompany;

exports.getBuildingCompanies = async () => {
	return await BuildingCompany.findAll();
}

exports.getBuildingCompany = async (id) => {
	return await BuildingCompany.findById(id);
}
