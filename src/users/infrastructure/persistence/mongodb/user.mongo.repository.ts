import { Inject } from '@nestjs/common';
import { Db, WithId, Document } from 'mongodb';
import { Nullable } from 'src/shared/domain/Nullable';
import { UserUsername } from 'src/users/domain/user.username';
import { User, UserPrimitiveProps } from '../../../domain/user';
import { UserId } from '../../../domain/user.id';
import { UserRepository } from '../../../domain/user.repository';

interface UserMongo extends WithId<Document>, UserPrimitiveProps {}

export class UserMongoRepository implements UserRepository {
	constructor(@Inject('DATABASE_CONNECTION') private db: Db) {}

	private collectionName(): string {
		return 'users';
	}

	async save(user: User): Promise<void> {
		await this.db
			.collection(this.collectionName())
			.updateOne(
				{ id: user.id.getValue() },
				{ $set: { ...user.toPrimitives() } },
				{ upsert: true },
			);
	}

	async find(id: UserId): Promise<Nullable<User>> {
		const user: UserMongo = (await this.db
			.collection(this.collectionName())
			.findOne({ id: id.getValue() })) as UserMongo;

		if (!user) return null;

		return User.fromPrimitives({ ...user });
	}

	async findAll(): Promise<Nullable<User[]>> {
		const users = (await this.db
			.collection(this.collectionName())
			.find({})
			.toArray()) as UserMongo[];

		return users.map((user: UserMongo) => User.fromPrimitives({ ...user }));
	}

	async findByUsername(username: UserUsername): Promise<Nullable<User>> {
		const user: UserMongo = (await this.db
			.collection(this.collectionName())
			.findOne({ username: username.getValue() })) as UserMongo;

		if (!user) return null;

		return User.fromPrimitives({ ...user });
	}
}
