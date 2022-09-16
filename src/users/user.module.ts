import { Module } from '@nestjs/common';
import { UserMemoryRepository } from './infrastructure/persistence/user.memory.repository';
import { UserFinderService } from './user.service';

@Module({
  imports: [],
  providers: [UserFinderService, UserMemoryRepository],
  exports: [UserFinderService],
})
export class UserModule {}
