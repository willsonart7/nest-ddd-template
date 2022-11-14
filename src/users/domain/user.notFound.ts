import { DomainError } from '../../shared/domain/DomainError';

export class UserNotFound extends DomainError {
	constructor() {
		super('User Not Found');
	}
}
