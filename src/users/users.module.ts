import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService] //need to export this user service and when we will import this 
  //module somewhere in the app in other module we can access the UserService to inject in that module
})
export class UsersModule {}
