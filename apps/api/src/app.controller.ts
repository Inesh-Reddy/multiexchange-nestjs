import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './app.service';
import { User } from '@repo/dbschema';

@Controller('user')
export class UserControllers {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/create')
  async addUser(@Body() name: { name: string }): Promise<User> {
    return this.userService.createUser(name);
  }
}
