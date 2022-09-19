import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { Nullable } from 'src/shared/domain/Nullable';

type ValidateReturn = {
  id: string;
  username: string;
  email: string;
};

@Injectable()
export class UserValidateService {
  constructor(
    @Inject('UserRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(
    username: string,
    password: string,
  ): Promise<Nullable<ValidateReturn>> {
    // FIXME: find by criteria
    const users: Nullable<User[]> = await this.repository.findAll();
    const user: Nullable<User> = users.find(
      (user: User) => user.username.name() === username,
    );

    if (!user) return null;

    return user.password.name() === password ? user.toPrimitives() : null;
  }
}
