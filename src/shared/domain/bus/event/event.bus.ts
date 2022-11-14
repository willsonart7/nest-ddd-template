import { DomainEvent } from './domain.event';

export interface EventBus {
	publish(events: DomainEvent[]): Promise<void>;
	register(event: string, handler: (args: object) => Promise<void>): Promise<void>;
}
