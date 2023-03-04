import { AuthService } from './../auth/auth.service';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../typeorm/entities/User';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => Boolean)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    try {
      console.log('createUser');
      await this.userService.createUser(username, password);
      return true;
    } catch {
      return false;
    }
  }

  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<any> {
    //TODO ANY
    try {
      const user = await this.userService.validateUser(username, password);
      if (user) {
        const token = await this.authService.login(user);
        return token;
      }
      return '';
    } catch {
      console.log('catch');
      return '';
    }
  }
}
