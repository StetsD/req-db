const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const CustomerCompany = db.define('customer_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	stuff: {type: Sequelize.INTEGER, allowNull: false}
});

exports.customerCompany = CustomerCompany;

exports.getCustomerCompanies = async () => {
	return await CustomerCompany.findAll();
}
