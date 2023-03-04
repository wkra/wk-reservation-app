import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desk } from '../typeorm/entities/Desk';
import { Reservation } from '../typeorm/entities/Reservation';
import { User } from '../typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Desk, User])],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
