const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Seller = db.define('seller', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER},
	customer_company: {type: Sequelize.INTEGER, allowNull: false}
});



exports.seller = Seller;

exports.getSellers = async () => {
	return await Seller.findAll();
}
