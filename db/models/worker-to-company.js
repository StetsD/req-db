const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const WorkerToCompany = db.define('worker-to-company', {
	worker_id: {type: Sequelize.INTEGER},
	building_company_id: {type: Sequelize.INTEGER}
});

exports.worker_to_company = WorkerToCompany;

exports.getWorkerCompany = async () => {
	return await WorkerToCompany.findAll();
}
