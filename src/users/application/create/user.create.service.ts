import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { UserId } from '../../domain/user.id';
import { UserEmail } from '../../domain/user.email';
import { UserUsername } from '../../domain/user.username';
import { UserPassword } from '../../domain/user.password';
import { User } from '../../domain/user';

@Injectable()
export class UserCreateService {
  constructor(
    @Inject('UserMemoryRepository')
    private readonly repository: UserRepository,
  ) {}

  async execute(
    id: string,
    email: string,
    username: string,
    password: string,
  ): Promise<void> {
    const userId = UserId.create(id);
    const userEmail = UserEmail.create(email);
    const userUsername = UserUsername.create(username);
    const userPassword = UserPassword.create(password);

    const user = User.create(
      {
        id: userId,
        email: userEmail,
        username: userUsername,
        password: userPassword,
      },
      userId,
    );

    await this.repository.save(user);
  }
}
