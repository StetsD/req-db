const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Boss = db.define('boss', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER},
	experience: {type: Sequelize.INTEGER, allowNull: false},
	building_company_id: {type: Sequelize.INTEGER, allowNull: false, unique: true}
});



exports.boss = Boss;

exports.getBosses = async () => {
	return await Boss.findAll();
}

exports.getBoss = async (id) => {
	return await Boss.findAll({
		where: {
			building_company_id: id
		}
	});
}

exports.addBoss = async data => {
	return await Boss.create(data);
}

exports.editBoss = async data => {
	return await db.query(`update bosses set
			(name, age, experience) = ('${data.name}', '${data.age}', '${data.experience}')
			where building_company_id = ${data.building_company_id}`, {
				type: db.QueryTypes.SELECT
			});
}

exports.deleteBoss = async (id) => {
	return await Boss.destroy({
		where: {
			id
		}
	})
}
