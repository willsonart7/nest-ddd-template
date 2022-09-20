import { User } from './user';
import { UserId } from './user.id';
import { Nullable } from '../../shared/domain/Nullable';

export interface UserRepository {
  save(user: User): Promise<void>;
  find(id: UserId): Promise<Nullable<User>>;
  findAll(): Promise<Nullable<User[]>>;
}
