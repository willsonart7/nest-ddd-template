import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: false,
  })
  username: string;

  @ApiProperty({
    required: false,
  })
  password: string;
}
