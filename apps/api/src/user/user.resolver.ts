import { FullUserModel } from './models/fullUser.model';
import { UseGuards } from '@nestjs/common';
import { Args, Resolver, Mutation, Context, Query } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CheckAbilities } from './../ability/abilities.decorator';
import { Action } from './../ability/ability.factory';
import { AbilitiesGuard } from './../ability/abilities.guard';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { User } from './../typeorm/entities/User';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  // @CheckAbilities({ action: Action.Remove, subject: User })
  // @UseGuards(AbilitiesGuard)
  // @UseGuards(JwtAuthGuard)
  // @Mutation(() => Boolean)
  // async removeUser(@Args('username') id: number): Promise<boolean> {
  //   return this.userService.remove(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => FullUserModel)
  async user(@Context() context: any): Promise<FullUserModel> {
    return context?.req?.user as FullUserModel;
  }
}
