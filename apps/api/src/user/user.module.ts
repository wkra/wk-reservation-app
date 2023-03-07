import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from '../typeorm/entities/User';
import { UserType } from '../typeorm/entities/UserType';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
