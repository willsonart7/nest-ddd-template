import {
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Body,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserCreatorService } from '../../application/create/user.creator.service';
import { UserCreateDto } from '../dtos/user.create.dto';

export interface RequestWithUser extends Request {
  user: { id: string; username: string };
}

@Controller('user')
export class UserPutController {
  constructor(private userCreatorService: UserCreatorService) {}

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
