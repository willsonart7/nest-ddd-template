export function ControllerResponse(message?: string) {
	return function (_target: unknown, _key: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
		const oiginalMethod = descriptor.value;

		descriptor.value = async function (this: unknown, ...args: unknown[]): Promise<unknown> {
			const data = await oiginalMethod.apply(this, args);

			return { success: true, response: data, message: message || null };
		};

		return descriptor;
	};
}
