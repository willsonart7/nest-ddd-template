import * as bcrypt from 'bcrypt';

export class Encrypt {
	public static hash(value: string): string {
		const salt = bcrypt.genSaltSync(10);

		return bcrypt.hashSync(value, salt);
	}

	public static compare(plain: string, hashed: string): boolean {
		return bcrypt.compareSync(plain, hashed);
	}
}
