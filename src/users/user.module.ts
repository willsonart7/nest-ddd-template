import { Module } from '@nestjs/common';
import { EventEmitterBus } from '../shared/infrastructure/bus/eventEmitter.bus';
import { SharedModule } from '../shared/shared.module';
import { UserCreatorService } from './application/create/user.creator.service';
import { UserFinderService } from './application/find/user.finder.service';
import { UserValidateService } from './application/validate/user.validate.service';
import { UserGetController } from './infrastructure/controllers/user.get.controller';
import { UserPutController } from './infrastructure/controllers/user.put.controller';
import { UserMemoryRepository } from './infrastructure/persistence/user.memory.repository';

@Module({
  imports: [SharedModule],
  providers: [
    {
      provide: 'IUserRepository',
      useValue: new UserMemoryRepository(),
    },
    {
      provide: 'IEventBus',
      useClass: EventEmitterBus,
    },
    UserCreatorService,
    UserFinderService,
    UserValidateService,
  ],
  exports: [UserValidateService],
  controllers: [UserPutController, UserGetController],
})
export class UserModule {}
