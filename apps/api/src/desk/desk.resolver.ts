import { JwtAdminGuard } from './../auth/jwt-admin.guard';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DeskService } from './desk.service';
import { DeskModel } from './models/desk.model';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class DeskResolver {
  constructor(private readonly deskService: DeskService) {}

  @Query(() => [DeskModel])
  async desks(): Promise<DeskModel[]> {
    return await this.deskService.getDesks();
  }

  @UseGuards(JwtAdminGuard)
  @Mutation(() => DeskModel)
  async createDesk(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('order') order: number,
  ): Promise<DeskModel> {
    return await this.deskService.createDesk(name, description, order);
  }

  @UseGuards(JwtAdminGuard)
  @Mutation(() => Boolean)
  async removeDesk(@Args('id') id: number): Promise<boolean> {
    return await this.deskService.removeDesk(id);
  }
}
