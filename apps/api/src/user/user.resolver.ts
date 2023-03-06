import { AuthService } from './../auth/auth.service';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../typeorm/entities/User';

@Resolver()
export class UserResolver {
  constructor() {}
}
