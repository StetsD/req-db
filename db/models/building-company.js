const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {boss} = require('./boss');

const BuildingCompany = db.define('building_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	address: {type: Sequelize.STRING},
	boss_id: {type: Sequelize.INTEGER, allowNull: false}
});

BuildingCompany.belongsTo(boss, {foreignKey: 'boss_id'});

exports.buildingCompany = BuildingCompany;

exports.getBuildingCompanies = async () => {
	return await BuildingCompany.findAll({include: [{model: boss, required: true}]});
}

exports.getBuildingCompany = async (id) => {
	return await BuildingCompany.findById(id);
}
