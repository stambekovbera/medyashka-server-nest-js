module.exports = {
	development: {
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'beradorstambekov',
		password: 'root',
		database: 'medyashka',
	},
	docker: {
		dialect: 'postgres',
		host: 'postgres',
		port: 5432,
		username: 'postgres',
		password: 'root',
		database: 'medyashka',
	},
	test: {
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'beradorstambekov',
		password: 'root',
		database: 'medyashka',
	},
	production: {
		dialect: 'postgres',
		host: 'localhost',
		port: 5432,
		username: 'beradorstambekov',
		password: 'root',
		database: 'medyashka',
	},
}