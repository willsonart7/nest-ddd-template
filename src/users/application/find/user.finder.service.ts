import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/user';
import { UserId } from '../../domain/user.id';
import { UserRepository } from '../../domain/user.repository';
import { UserNotFound } from '../../domain/user.notFound';
import { Nullable } from 'src/shared/domain/Nullable';

@Injectable()
export class UserFinderService {
	constructor(@Inject('IUserRepository') private readonly repository: UserRepository) {}

	async execute(id: string): Promise<User> {
		const userId = UserId.create(id);

		const user: Nullable<User> = await this.repository.find(userId);

		if (!user) {
			throw new UserNotFound();
		}

		return user;
	}
}
