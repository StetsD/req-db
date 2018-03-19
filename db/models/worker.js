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
