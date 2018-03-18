const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Client = db.define('client', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER}
});



exports.client = Client;

exports.getClient = async () => {
	return await Client.findAll();
}
