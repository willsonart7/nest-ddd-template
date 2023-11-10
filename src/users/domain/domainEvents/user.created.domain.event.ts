import { DomainEvent } from '../../../shared/domain/bus/event/domain.event';
import { User, UserPrimitiveProps } from '../user';

export class UserCreatedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = 'user.created';

	private readonly user: User;

	constructor({ id, user, eventId, occurredOn }: { id: string; user: User; eventId?: string; occurredOn?: string }) {
		super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
		this.user = user;
	}

	public toPrimitives(): { eventName: string; id: string; payload: UserPrimitiveProps } {
		const { aggregateId, user } = this;
		return {
			eventName: UserCreatedDomainEvent.EVENT_NAME,
			id: aggregateId,
			payload: {
				...user.toPrimitives(),
			},
		};
	}

	public static fromPrimitives(
		aggregateId: string,
		payload: UserPrimitiveProps,
		eventId: string,
		occurredOn: string,
	): DomainEvent {
		return new UserCreatedDomainEvent({
			id: aggregateId,
			user: User.fromPrimitives(payload),
			eventId,
			occurredOn,
		});
	}
}
