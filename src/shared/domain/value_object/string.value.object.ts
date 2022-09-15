export class StringValueObject {
  protected value: string;

  constructor(value: string) {
    this.value = value;
  }

  public name(): string {
    return this.value;
  }
}
