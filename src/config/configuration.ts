export default (): object => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	environment: process.env.ENVIRONMENT || 'development',
	tokenSecretKey: process.env.TOKEN_SECRET_KEY || 'secret',
	mongo: {
		uri: process.env.MONGO_URL || 'mongo://localhost:2702',
		dbName: process.env.MONGO_DB_NAME || 'test',
	},
});
