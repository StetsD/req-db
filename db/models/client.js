const Sequelize = require('sequelize');
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

exports.editClient = async (data) => {
	return await db.query(`update clients set (name, age) = ('${data.name}', ${data.age})
							where id = ${data.id};`);
}

exports.getClientByName = async name => {
	return await db.query(`select * from clients
			where name ilike '${name}%'`,
		{type: db.QueryTypes.SELECT});
}
