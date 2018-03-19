const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {seller} = require('./seller');

const CustomerCompany = db.define('customer_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false}
});

exports.customerCompany = CustomerCompany;

exports.getCustomerCompanies = async () => {
	return await db.query(`select cc.id, cc.name, sum(1) as stuff
			from customer_companies cc, sellers s
			where cc.id = s.customer_company_id
			group by cc.id order by cc.id;`,
		{type: db.QueryTypes.SELECT});
}

exports.getCustomerCompany = async (id) => {
	return await db.query(`select cc.id as customer_company_id, cc.name as company, s.name, s.id, s.age
			from customer_companies cc, sellers s
			where cc.id = ${id} and s.customer_company_id = cc.id;`,
		{type: db.QueryTypes.SELECT});
}
