import { DomainEvent } from './domain.event';

export interface EventBus {
  publish(events: DomainEvent[]): Promise<DomainEvent>;
}
