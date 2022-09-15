import { DomainEvent } from '../bus/event/domain.event';
import { UniqueValueObject } from '../value_object/unique.value.object';
import { Entity } from './entity';

export class AggregateRoot<T> extends Entity<T> {
  private _domainEvents: DomainEvent[] = [];

  get getId(): UniqueValueObject {
    return this.id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

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
    console.info(
      `[Domain Event Created]:`,
      thisClass.constructor.name,
      '==>',
      domainEventClass.constructor.name,
    );
  }
}
