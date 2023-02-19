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


  @Mutation(()=> Boolean)
  async createUser(
    @Args('username') username: string,
  ): Promise<boolean> {
    try {
      await this.userService.createUser(username);
      return true
    } 
    catch {
      return false
    }

  }
}
