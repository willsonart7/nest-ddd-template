export class JsonValueObject {
	protected value: string;

	constructor(value: object) {
		this.value = JSON.stringify(value);
	}

	public getValue(): object {
		return JSON.parse(this.value);
	}

	public toString(): string {
		return this.value;
	}
}
