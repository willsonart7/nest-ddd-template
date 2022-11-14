import { Logger } from '@nestjs/common';
import { DomainEvent } from '../bus/event/domain.event';

export abstract class AggregateRoot {
	private _domainEvents: DomainEvent[] = [];

	get domainEvents(): DomainEvent[] {
		return this._domainEvents;
	}

	abstract toPrimitives(): object;

	protected addDomainEvent(domainEvent: DomainEvent): void {
		this._domainEvents.push(domainEvent);
		this.logDomainEventAdded(domainEvent);
	}

	public clearEvents(): void {
		this._domainEvents.splice(0, this._domainEvents.length);
	}

	private logDomainEventAdded(domainEvent: DomainEvent): void {
		const thisClass = Reflect.getPrototypeOf(this);
		const domainEventClass = Reflect.getPrototypeOf(domainEvent);
		Logger.log(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name);
	}
}
