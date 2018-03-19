const fs = require('fs');
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

//Models init
fs.readdirSync('./models', err=>throw new Error(err))
.forEach(model => require(`./models/${model}`));
