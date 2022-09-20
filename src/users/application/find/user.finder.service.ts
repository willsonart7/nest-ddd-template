import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user.id';
import { UserRepository } from '../../domain/user.repository';
import { Nullable } from 'src/shared/domain/Nullable';

@Injectable()
export class UserFinderService {
  constructor(
    @Inject('IUserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(id: string): Promise<Nullable<User>> {
    const userId = UserId.create(id);

    return this.repository.find(userId);
  }
}
