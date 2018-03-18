const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', '987654321Qq', {
	host: 'localhost',
	port: 5432,
	dialect: 'postgres',
	operatorsAlizses: false,

	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = sequelize.authenticate;

// sequelize
// 	.authenticate()
// 	.then(()=>{
//
//
//
// 	})
// 	.catch(err => {
// 		console.error(err);
// 	});
