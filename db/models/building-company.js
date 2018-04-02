const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {boss} = require('./boss');
const {worker} = require('./worker');

const BuildingCompany = db.define('building_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	address: {type: Sequelize.STRING}
});

exports.buildingCompany = BuildingCompany;

exports.getBuildingCompanies = async () => {
	return await db.query(`select bc.*, b.name as boss, b.age as age, b.experience as exp
						from building_companies as bc
						inner join bosses b on b.building_company_id = bc.id;`,
				{
					type: db.QueryTypes.SELECT
				});
}

exports.getBuildingCompany = async (id) => {
	return await BuildingCompany.findById(id);
}

exports.getBuildingCompanyByName = async val => {
	return await db.query(`select * from building_companies
			where name ilike '%${val}%'`,
		{type: db.QueryTypes.SELECT});
}

exports.addBuildingCompany = async data => {
	return await BuildingCompany.create(data);
}

exports.deleteBuildingCompany = async id => {
	return await BuildingCompany.destroy({
		where: {id}
	});
}

exports.editBuildingCompany = async data => {
	return await db.query(`update building_companies set
			(name, address) = ('${data.name}', '${data.address}')
			where id = ${data.id}`,{
				type: db.QueryTypes.SELECT
			});
};
