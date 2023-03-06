import { FullUserModel } from './../user/models/fullUser.model';
import { UserModel } from './../user/models/user.model';
import { LocalAuthGuard } from './guards/local-auth.gard';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Args, Resolver, Mutation, Context } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => FullUserModel)
  async register(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<FullUserModel> {
    return this.authService.register(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => String)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<string> {
    const user = context?.req?.user as FullUserModel;

    return this.authService.login(user);
  }
}
