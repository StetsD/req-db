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
