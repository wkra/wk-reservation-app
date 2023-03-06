import { AbilitiesGuard } from './../ability/abilities.guard';
import { Action } from './../ability/ability.factory';
import { CheckAbilities } from 'src/ability/abilities.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeskService } from './desk.service';
import { DeskModel } from './models/desk.model';
import { UseGuards } from '@nestjs/common';
import { Desk } from 'src/typeorm/entities/Desk';

@Resolver()
export class DeskResolver {
  constructor(private readonly deskService: DeskService) {}

  @Query(() => [DeskModel])
  async desks(): Promise<DeskModel[]> {
    return await this.deskService.getDesks();
  }

  @CheckAbilities({ action: Action.Create, subject: Desk })
  @UseGuards(AbilitiesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeskModel)
  async createDesk(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('order') order: number,
  ): Promise<DeskModel> {
    return await this.deskService.createDesk(name, description, order);
  }

  @CheckAbilities({ action: Action.Delete, subject: Desk })
  @UseGuards(AbilitiesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeDesk(@Args('id') id: number): Promise<boolean> {
    return await this.deskService.removeDesk(id);
  }
}
