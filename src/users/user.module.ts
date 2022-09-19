import { Module } from '@nestjs/common';
import { UserCreateService } from './application/create/user.create.service';
import { UserMemoryRepository } from './infrastructure/persistence/user.memory.repository';
import { UserFinderService } from './user.service';

@Module({
  imports: [],
  providers: [
    UserFinderService,
    UserCreateService,
    { provide: 'IUserMemoryRepository', useValue: UserMemoryRepository },
  ],
  exports: [UserFinderService],
})
export class UserModule {}
