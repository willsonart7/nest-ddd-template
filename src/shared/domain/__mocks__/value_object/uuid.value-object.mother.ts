import { Mother } from '../mother';

export class UuidMother {
	static random(): string {
		return Mother.random().datatype.uuid();
	}
}
