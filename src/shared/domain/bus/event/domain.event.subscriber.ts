export abstract class DomainEventSubscriber<T> {
	abstract consumer(event: T): void;
}
