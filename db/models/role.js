const Sequelize = require('sequelize');
const db = require('../index.js').instance;

const Role = db.define('role', {
	id: {type: Sequelize.INTEGER, allowNull: false, primaryKey: true},
	value: {type: Sequelize.STRING, unique: true, allowNull: false}
});

exports.role = Role;
