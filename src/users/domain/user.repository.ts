import { User } from './user';
import { UserId } from './user.id';
import { Nullable } from '../../shared/domain/Nullable';
import { UserUsername } from './user.username';

export interface UserRepository {
	save(user: User): Promise<void>;
	find(id: UserId): Promise<Nullable<User>>;
	findAll(): Promise<Nullable<User[]>>;
	findByUsername(username: UserUsername): Promise<Nullable<User>>;
}
