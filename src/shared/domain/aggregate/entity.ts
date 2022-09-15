import { UniqueValueObject } from '../value_object/unique.value.object';

export class Entity<T> {
  protected readonly id: UniqueValueObject;
  public readonly props: T;

  constructor(props: T, id?: UniqueValueObject) {
    this.id = id ? id : new UniqueValueObject();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this.id.equals(object.id);
  }
}
