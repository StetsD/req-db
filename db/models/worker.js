const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Worker = db.define('worker', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER},
	experience: {type: Sequelize.INTEGER, allowNull: false}
});

exports.worker = Worker;

exports.getWorkers = async () => {
	return await Worker.findAll();
}

exports.getSummWorkers = async () => {
	return await db.query(`select workers.*,
		wtc.building_company_id, bc.name as company_name from workers
		left join worker_to_companies wtc on wtc.worker_id = workers.id
		left join building_companies bc on bc.id = wtc.building_company_id;`, {
			type: db.QueryTypes.SELECT
		});
}
