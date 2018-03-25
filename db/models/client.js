const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Client = db.define('client', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER}
});



exports.client = Client;

exports.getClients = async () => {
	return await Client.findAll();
}

exports.getClient = async (id) => {
	return await Client.findById(id);
}

exports.addClient = async (data) => {
	return await Client.create(data);
}

exports.deleteClient = async (id) => {
	return await Client.destroy({
		where: {
			id
		}
	})
}
