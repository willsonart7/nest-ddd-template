import { Module } from '@nestjs/common';
import { StringValueObject } from './domain/value_object/string.value.object';
import { IntValueObject } from './domain/value_object/int.value.object';
import { BooleanValueObject } from './domain/value_object/boolean.value.object';
import { JsonValueObject } from './domain/value_object/json.value.object';
import { UniqueValueObject } from './domain/value_object/unique.value.object';

@Module({
  imports: [],
  providers: [
    StringValueObject,
    IntValueObject,
    BooleanValueObject,
    JsonValueObject,
    UniqueValueObject,
  ],
  exports: [
    StringValueObject,
    IntValueObject,
    BooleanValueObject,
    JsonValueObject,
    UniqueValueObject,
  ],
})
export class SharedModule {}
