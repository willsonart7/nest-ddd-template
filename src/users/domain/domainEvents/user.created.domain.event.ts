import { DomainEvent } from '../../../shared/domain/bus/event/domain.event';

type UserCreatedBody = {
	readonly id: string;
	readonly email: string;
	readonly username: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'user.created';

	readonly email: string;
	readonly username: string;

	constructor({
		id,
		email,
		username,
		eventId,
		occurredOn,
	}: {
		id: string;
		email: string;
		username: string;
		eventId?: string;
		occurredOn?: string;
	}) {
		super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
		this.email = email;
		this.username = username;
	}

	public toPrimitives(): object {
		const { aggregateId, email, username } = this;

		return {
			eventName: UserCreatedDomainEvent.EVENT_NAME,
			id: aggregateId,
			email,
			username,
		};
	}

	public static fromPrimitives(
		aggregateId: string,
		payload: UserCreatedBody,
		eventId: string,
		occurredOn: string,
	): DomainEvent {
		return new UserCreatedDomainEvent({
			id: aggregateId,
			email: payload.email,
			username: payload.username,
			eventId,
			occurredOn,
		});
	}
}
