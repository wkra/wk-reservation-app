import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../typeorm/entities/User';
import { UserType } from '../typeorm/entities/UserType';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
