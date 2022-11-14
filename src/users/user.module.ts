import { Module } from '@nestjs/common';
import { EventEmitterBus } from '../shared/infrastructure/bus/eventEmitter.bus';
import { SharedModule } from '../shared/shared.module';
import { UserCreateService } from './application/create/user.create.service';
import { UserFinderService } from './application/find/user.finder.service';
import { UserValidateService } from './application/validate/user.validate.service';
import { UserGetController } from './infrastructure/controllers/user.get.controller';
import { UserPutController } from './infrastructure/controllers/user.put.controller';
import { UserMongoRepository } from './infrastructure/persistence/mongodb/user.mongo.repository';

@Module({
	imports: [SharedModule],
	providers: [
		{
			provide: 'IUserRepository',
			useClass: UserMongoRepository,
		},
		{
			provide: 'IEventBus',
			useClass: EventEmitterBus,
		},
		UserCreateService,
		UserFinderService,
		UserValidateService,
	],
	exports: [UserValidateService],
	controllers: [UserPutController, UserGetController],
})
export class UserModule {}
