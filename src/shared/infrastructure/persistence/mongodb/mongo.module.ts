import { Module, Global } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
	imports: [ConfigModule],
	providers: [
		{
			provide: 'DATABASE_CONNECTION',
			useFactory: async (config: ConfigService): Promise<Db> => {
				try {
					const uri = config.get('mongo.uri');
					const client = await MongoClient.connect(uri);

					return client.db(config.get('mongo.dbName'));
				} catch (e) {
					throw new Error(`Error db connect ${e}`);
				}
			},
			inject: [ConfigService],
		},
	],
	exports: ['DATABASE_CONNECTION'],
})
export class MongoDbModule {}
