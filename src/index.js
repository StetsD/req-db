const createDb = require('./db');

(async () => {
	try{
		const pgCli = await createDb();

		const res = await pgCli.query(`create table
			if not exists users
		(
			id serial primary key,
			name varchar(255) not null,
			surname varchar(255),
			age int not null
		);`);

		await pgCli.query(`insert into users(name, surname, age) values ('Boris', 'Britva', 46);`);


	}catch(err){
		throw new Error(err);
	}
})();
