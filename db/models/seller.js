const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const Seller = db.define('seller', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	age: {type: Sequelize.INTEGER},
	customer_company_id: {type: Sequelize.INTEGER, allowNull: false}
});



exports.seller = Seller;

exports.getSellers = async () => {
	return await Seller.findAll();
}

exports.getSellersByCompanyId = async id => {
	return await db.query(`select cc.id as customer_company_id, cc.name as company, s.name, s.id, s.age
			from customer_companies cc, sellers s
			where cc.id = ${id} and s.customer_company_id = cc.id;`,
		{type: db.QueryTypes.SELECT});
}

exports.addSellers = async sellers => {
	return await Seller.bulkCreate(sellers);
}

exports.addSeller = async data => {
	return await Seller.create(data);
}

exports.deleteSeller = async id => {
	return await Seller.destroy({
		where: {id}
	});
}
