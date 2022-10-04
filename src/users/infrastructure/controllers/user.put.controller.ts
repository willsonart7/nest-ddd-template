import {
  Controller,
  HttpCode,
  Param,
  Body,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { UserCreateService } from '../../application/create/user.create.service';
import { UserCreateDto } from '../dtos/user.create.dto';

export interface RequestWithUser extends Request {
  user: { id: string; username: string };
}

@Controller('user')
export class UserPutController {
  constructor(private userCreatorService: UserCreateService) {}

  @Put('/:id')
  @HttpCode(201)
  async execute(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() userCreateDto: UserCreateDto,
  ): Promise<void> {
    await this.userCreatorService.execute(
      id,
      userCreateDto.email,
      userCreateDto.username,
      userCreateDto.password,
    );
  }
}
