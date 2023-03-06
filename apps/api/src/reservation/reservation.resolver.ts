import { AbilityFactory } from './../ability/ability.factory';
import { ForbiddenError } from '@casl/ability';
import { FullUserModel } from './../user/models/fullUser.model';
import { Action } from './../ability/ability.factory';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Reservation } from '../typeorm/entities/Reservation';
import { ReservationModel } from './models/reservation.model';
import { ReservationService } from './reservation.service';
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
    return await this.reservationService.getReservations(date);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => ReservationModel)
  async createReservation(
    @Args('userId') userId: number,
    @Args('deskId') deskId: number,
    @Args('date') date: Date,
    @Context() context: any,
  ): Promise<ReservationModel> {
    const user = context?.req?.user as FullUserModel;

    return await this.reservationService.createReservation(
      userId,
      deskId,
      date,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async removeReservation(
    @Args('id') id: number,
    @Context() context: any,
  ): Promise<boolean> {
    const user = context?.req?.user as FullUserModel;
    const reservation = await this.reservationService.findOne(id);

    if (!reservation) {
      throw new BadRequestException('Reservation do not exist.');
    }

    const ability = this.abilityFactory.defineAbility(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan(
        Action.Delete,
        reservation.user,
      );

      return await this.reservationService.removeReservation(id);
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
