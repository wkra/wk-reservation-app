import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../typeorm/entities/User';
import { UserResolver } from './user.resolver';
import { UserType } from '../typeorm/entities/UserType';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],
  providers: [UserService, UserResolver],
})
export class UserModule {}
