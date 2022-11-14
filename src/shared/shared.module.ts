import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter/dist/event-emitter.module';
import { StringValueObject } from './domain/value_object/string.value.object';
import { IntValueObject } from './domain/value_object/int.value.object';
import { BooleanValueObject } from './domain/value_object/boolean.value.object';
import { JsonValueObject } from './domain/value_object/json.value.object';
import { UniqueValueObject } from './domain/value_object/unique.value.object';
import { EventEmitterBus } from './infrastructure/bus/eventEmitter.bus';
import { Encrypt } from './infrastructure/utils/encrypt';

@Module({
	imports: [
		EventEmitterModule.forRoot({
			wildcard: false,
			delimiter: '.',
			newListener: false,
			removeListener: false,
			maxListeners: 10,
			verboseMemoryLeak: false,
			ignoreErrors: false,
		}),
	],
	providers: [
		EventEmitterBus,
		StringValueObject,
		IntValueObject,
		BooleanValueObject,
		JsonValueObject,
		UniqueValueObject,
		Encrypt,
	],
	exports: [
		EventEmitterBus,
		StringValueObject,
		IntValueObject,
		BooleanValueObject,
		JsonValueObject,
		UniqueValueObject,
		Encrypt,
	],
})
export class SharedModule {}
