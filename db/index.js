const Sequelize = require('sequelize');
const sequelize = new Sequelize('building', 'postgres', '987654321Qq', {
	host: 'localhost',
	port: 5432,
	dialect: 'postgres',

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = {
	init(){
		return sequelize.authenticate();
	},
	instance: sequelize
};

//Models
const client = require('./models/client');
