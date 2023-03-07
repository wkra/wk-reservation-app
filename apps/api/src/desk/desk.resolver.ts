import { UseGuards, BadRequestException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeskService } from './desk.service';
import { DeskModel } from './models/desk.model';
import { AbilitiesGuard } from './../ability/abilities.guard';
import { Action } from './../ability/ability.factory';
import { CheckAbilities } from './../ability/abilities.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Desk } from './../typeorm/entities/Desk';

@Resolver()
export class DeskResolver {
  constructor(private readonly deskService: DeskService) {}

  @Query(() => [DeskModel])
  async desks(): Promise<DeskModel[]> {
    return await this.deskService.findAll();
  }

  @CheckAbilities({ action: Action.Create, subject: Desk })
  @UseGuards(AbilitiesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeskModel)
  async createDesk(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('order', { nullable: true }) order: number,
  ): Promise<DeskModel> {
    const deskWithName = await this.deskService.findOneByName(name);

    if (deskWithName) {
      throw new BadRequestException('Desk with same name exist.');
    }
    return await this.deskService.create(name, description, order);
  }

  @CheckAbilities({ action: Action.Remove, subject: Desk })
  @UseGuards(AbilitiesGuard)
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeDesk(@Args('id') id: number): Promise<boolean> {
    return await this.deskService.remove(id);
  }
}
