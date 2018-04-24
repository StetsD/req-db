const {name, user, password, host, port, dialect} = require('../config').database;
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(name, user, password, {
	host,
	port,
	dialect,
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	logging: false
});

module.exports = {
	init(){
		return sequelize.authenticate();
	},
	instance: sequelize
};

//Models init
fs.readdirSync(path.resolve(__dirname, 'models'), err => {throw new Error(err)})
.forEach(model => {
	require(`./models/${model}`)
});
