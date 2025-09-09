import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserControllers {
  @Get('/')
  getUser(@Body() input: string): string {
    return input;
  }

  @Post('/bust')
  addUser(@Body() input: string): string {
    return `${input} added successfully`;
  }
}
