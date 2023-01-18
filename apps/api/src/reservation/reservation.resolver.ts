import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Reservation} from '../typeorm/entities/Reservation';
import {ReservationModel} from './models/reservation.model';
import {ReservationService} from './reservation.service';


@Resolver()
export class ReservationResolver {
  constructor(
    private readonly reservationService: ReservationService
  ) {
  }

  @Query(() => [ReservationModel])
  async reservations(
    @Args('date') date: Date,
  ): Promise<Reservation[]> {
    return await this.reservationService.getReservations(date);
  }

  @Mutation(() => ReservationModel)
  async createReservation(
    @Args('userId') userId: number,
    @Args('deskId') deskId: number,
    @Args('date') date: Date,
  ): Promise<ReservationModel> {
    return await this.reservationService.createReservation(userId, deskId, date);
  }

  @Mutation(() => Boolean)
  async removeReservation(
    @Args('id') id: number,
  ): Promise<boolean> {
    return await this.reservationService.removeReservation(id);
  }
}
