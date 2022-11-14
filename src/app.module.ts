import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MongoDbModule } from './shared/infrastructure/persistence/mongodb/mongo.module';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './shared/infrastructure/filters/all.exceptions.filter';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			isGlobal: true,
		}),

		MongoDbModule,
		HealthModule,
		SharedModule,
		UserModule,
		AuthModule,
		NotificationsModule,
	],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_FILTER,
			useClass: AllExceptionsFilter,
		},
	],
})
export class AppModule {}
