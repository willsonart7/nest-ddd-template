import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../../shared/domain/bus/event/domain.event';
import { EventBus } from '../../../shared/domain/bus/event/event.bus';

@Injectable()
export class EventEmitterBus implements EventBus {
	constructor(private eventEmitter: EventEmitter2) {}

	async publish(events: DomainEvent[]): Promise<void> {
		const { eventEmitter } = this;

		await Promise.all(events.map((event: DomainEvent): boolean => eventEmitter.emit(event.kind, event.toPrimitives())));
	}

	async register(listener: string, handler: (args: object) => Promise<void>): Promise<void> {
		this.eventEmitter.on(listener, handler);
	}
}
