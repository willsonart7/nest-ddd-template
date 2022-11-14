import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class UserCreateDto {
	@ApiProperty({
		required: true,
	})
	@IsNotEmpty()
	@IsEmail()
	email: string;

	@ApiProperty({
		required: false,
	})
	@IsNotEmpty()
	username: string;

	@ApiProperty({
		required: false,
	})
	@IsNotEmpty()
	password: string;
}
