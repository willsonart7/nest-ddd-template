import { UuidMother } from '../../../../shared/domain/__mocks__/value_object/uuid.value-object.mother';
import { UserId } from '../../user.id';

export class UserIdMother {
	static create(value: string): UserId {
		return UserId.create(value);
	}

	static random(): UserId {
		return UserIdMother.create(UuidMother.random());
	}
}
