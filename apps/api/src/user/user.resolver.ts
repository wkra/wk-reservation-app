import {
  Args,
  Resolver,
  Mutation,
} from '@nestjs/graphql';
import {UserService} from './user.service';
import {User} from '../typeorm/entities/User';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService
  ) {}


  @Mutation(()=> String)
  async createUser(
    @Args('username') username: string,
  ): Promise<User> {
    return await this.userService.createUser(username);
  }
}
