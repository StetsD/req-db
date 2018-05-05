const Sequelize = require('sequelize');
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

exports.getWorker = async id => {
	return await Worker.findById(id);
}

exports.getSummWorkers = async () => {
	return await db.query(`select workers.*,
		wtc.building_company_id, bc.name as company_name from workers
		left join worker_to_companies wtc on wtc.worker_id = workers.id
		left join building_companies bc on bc.id = wtc.building_company_id;`, {
			type: db.QueryTypes.SELECT
		});
}

exports.getWorkersByCompId = async id => {
	return await db.query(`select w.* from worker_to_companies wtc
			inner join workers w on w.id = wtc.worker_id
			where wtc.building_company_id = ${id};`, {
				type: db.QueryTypes.SELECT
			});
}

exports.addWorker = async data => {
	return await Worker.create(data);
}

exports.deleteWorker = async id => {
	return await Worker.destroy({
		where: {id}
	});
}

exports.editWorker = async data => {
	return await db.query(`update workers set (name, age, experience) =
		('${data.name}', '${data.age}', '${data.experience}') where id = ${data.id}`, {
			type: db.QueryTypes.SELECT
		});
}
