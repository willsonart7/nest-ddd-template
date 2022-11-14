import { UniqueValueObject } from '../../value_object/unique.value.object';

export abstract class DomainEvent {
	static EVENT_NAME: string;
	abstract toPrimitives(): object;
	readonly kind: string;
	readonly aggregateId: string;
	readonly eventId: string;
	readonly occurredOn: string;

	constructor(kind: string, aggregateId: string, eventId?: string, occurredOn?: string) {
		this.kind = kind;
		this.aggregateId = aggregateId;
		this.eventId = eventId ? eventId : new UniqueValueObject().getValue();
		this.occurredOn = occurredOn ? occurredOn : new Date().toString();
	}
}
