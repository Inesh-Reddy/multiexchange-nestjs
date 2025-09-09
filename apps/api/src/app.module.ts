import { Module } from '@nestjs/common';
import { UserControllers } from './app.controller';

@Module({
  imports: [],
  controllers: [UserControllers],
  providers: [],
})
export class AppModule {}
