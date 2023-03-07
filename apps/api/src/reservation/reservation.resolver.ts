import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ForbiddenError } from '@casl/ability';
import { ReservationService } from './reservation.service';
import { ReservationModel } from './models/reservation.model';
import { FullUserModel } from './../user/models/fullUser.model';
import { AbilityFactory } from './../ability/ability.factory';
import { Action } from './../ability/ability.factory';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Reservation } from '../typeorm/entities/Reservation';
import {
  ForbiddenException,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';

@Resolver()
export class ReservationResolver {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly abilityFactory: AbilityFactory,
  ) {}

  @Query(() => [ReservationModel])
  async reservations(@Args('date') date: Date): Promise<Reservation[]> {
    return await this.reservationService.findAll(date);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReservationModel)
  async createReservation(
    @Args('deskId') deskId: number,
    @Args('date') date: Date,
    @Context() context: any,
  ): Promise<ReservationModel> {
    const findByDeskIdAndDate =
      await this.reservationService.findByDeskIdAndDate(deskId, date);

    if (findByDeskIdAndDate.length) {
      throw new BadRequestException(
        'Choosen desk is already reserved on that date!',
      );
    }
    const userId = context?.req?.user?.id;

    const findByUserIdAndDate =
      await this.reservationService.findByUserIdAndDate(userId, date);

    if (findByUserIdAndDate.length) {
      throw new BadRequestException(
        'You have a reservation on that day. Only one desk can be reserved on a single day!',
      );
    }

    return await this.reservationService.create(userId, deskId, date);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeReservation(
    @Args('id') id: number,
    @Context() context: any,
  ): Promise<boolean> {
    const fullUser = context?.req?.user as FullUserModel;
    const reservation = await this.reservationService.findOneById(id);

    if (!reservation) {
      throw new BadRequestException('Reservation do not exist.');
    }

    const ability = this.abilityFactory.defineAbility(fullUser);

    try {
      ForbiddenError.from(ability).throwUnlessCan(Action.Remove, reservation);

      return await this.reservationService.remove(id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
