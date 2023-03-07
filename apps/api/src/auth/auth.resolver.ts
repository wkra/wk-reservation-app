import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.gard';
import { TokenModel } from './../user/models/token.model';
import { FullUserModel } from './../user/models/fullUser.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => FullUserModel)
  async createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<FullUserModel> {
    return this.authService.register(username, password);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => TokenModel)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Context() context: any,
  ): Promise<TokenModel> {
    const user = context?.req?.user as FullUserModel;

    return this.authService.login(user);
  }
}
