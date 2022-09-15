import { Module } from '@nestjs/common';
import { UserFinderService } from './user.service';

@Module({
  providers: [UserFinderService],
  exports: [UserFinderService],
})
export class UserModule {}
