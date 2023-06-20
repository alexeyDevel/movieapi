import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserInterceptor } from './interceptors/create-user.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(CreateUserInterceptor)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);
    return user.login;
  }
}
