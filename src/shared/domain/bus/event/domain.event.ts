import { UniqueValueObject } from '../../value_object/unique.value.object';

export class DomainEvent {
  private kind: string;
  private eventId: UniqueValueObject;
  private occurredOn: string;
  private attributes: object;

  constructor(
    eventId: UniqueValueObject,
    kind: string,
    attributes: object,
    occurredOn: string = null,
  ) {
    this.kind = kind;
    this.attributes = attributes;
    this.eventId = eventId ? eventId : new UniqueValueObject();
    this.occurredOn = occurredOn ? occurredOn : new Date().toString();
  }

  public getKind(): string {
    return this.kind;
  }

  public getEventId(): string {
    return this.eventId.getValue();
  }

  public getOccurredOn(): string {
    return this.occurredOn;
  }

  public getAttributes(): object {
    return this.attributes;
  }
}
