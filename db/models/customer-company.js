const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {seller} = require('./seller');

const CustomerCompany = db.define('customer_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false}
});

exports.customerCompany = CustomerCompany;

exports.getCustomerCompanies = async () => {
	return await db.query(`select cc.id, cc.name, count(s) as stuff
			from customer_companies cc
			left join sellers s on cc.id = s.customer_company_id
			group by cc.id order by cc.id;`,
		{type: db.QueryTypes.SELECT});
}

exports.getCustomerCompany = async (id) => {
	return await CustomerCompany.findById(id);
}

exports.getCustomerCompaniesByName = async val => {
	return await db.query(`select * from customer_companies
			where name ilike '${val}%'`,
		{type: db.QueryTypes.SELECT});
}

exports.addCustomerCompanies = async data => {
	return await CustomerCompany.create(data);
}

exports.deleteCustomerCompany = async id => {
	return await CustomerCompany.destroy({
		where: {id}
	});
}

exports.editCustomerCompany = async data => {
	return await db.query(`update customer_companies
		set name = '${data.name}'
		where id = ${data.id}`, {
			type: db.QueryTypes.SELECT
		});
}
