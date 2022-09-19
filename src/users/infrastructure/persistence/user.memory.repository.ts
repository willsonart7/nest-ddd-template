import { Nullable } from 'src/shared/domain/Nullable';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user.id';
import { UserRepository } from '../../domain/user.repository';

export class UserMemoryRepository implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async find(id: UserId): Promise<Nullable<User>> {
    return this.users.find(
      (user: User) => id.getValue() === user.id.getValue(),
    );
  }

  async findAll(): Promise<Nullable<User[]>> {
    return this.users;
  }
}
