import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Body,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserCreateService } from '../../application/create/user.create.service';
import { UserCreateDto } from '../dtos/user.create.dto';

@Controller('user')
export class UserPutController {
  constructor(private userCreatorService: UserCreateService) {}

  @Put('/:id')
  async execute(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userCreateDto: UserCreateDto,
  ): Promise<HttpException> {
    try {
      await this.userCreatorService.execute(
        id,
        userCreateDto.email,
        userCreateDto.username,
        userCreateDto.password,
      );

      return new HttpException({}, HttpStatus.CREATED);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
