const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const WorkerToCompany = db.define('worker_to_company', {
	worker_id: {type: Sequelize.INTEGER},
	building_company_id: {type: Sequelize.INTEGER}
});

exports.workerToCompany = WorkerToCompany;

exports.getWorkerCompany = async () => {
	return await WorkerToCompany.findAll();
}

exports.addWorkerRelation = async data => {
	return await WorkerToCompany.bulkCreate(data);
}

exports.getCompaniesByWorkerId = async id => {
	return await db.query(`select wtc.building_company_id, bc.name from worker_to_companies wtc
		inner join building_companies bc on bc.id = wtc.building_company_id
		where wtc.worker_id = ${id};`, {
			type: db.QueryTypes.SELECT
		});
}

exports.deleteWorkerRelation = async id => {
	return await WorkerToCompany.destroy({
		where: {worker_id: id}
	});
}
