import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './app.service';
import { UserControllers } from './app.controller';
import { AppDataSource } from '@repo/dbschema';
import { User } from '@repo/dbschema';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
      synchronize: false,
      migrationsRun: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserControllers],
  providers: [UserService],
})
export class AppModule {}
