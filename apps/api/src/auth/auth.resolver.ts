import { AuthService } from './auth.service';
import { Args, Resolver, Mutation } from '@nestjs/graphql';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Boolean)
  async signIn(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<boolean> {
    try {
      return true;
    } catch {
      return false;
    }
  }
}
