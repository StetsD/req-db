const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Deal = db.define('deal', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	client: {type: Sequelize.INTEGER, allowNull: false},
	building: {type: Sequelize.INTEGER, allowNull: false}
});

exports.deal = Deal;

exports.getDeals = async () => {
	return await Deal.findAll();
}
