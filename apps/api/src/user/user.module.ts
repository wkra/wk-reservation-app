import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UserResolver } from './user.resolver';
import { UserType } from '../typeorm/entities/UserType';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserType]), AuthModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
