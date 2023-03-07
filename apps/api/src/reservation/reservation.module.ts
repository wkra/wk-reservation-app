import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeskModule } from './../desk/desk.module';
import { AbilityModule } from './../ability/ability.module';
import { ReservationService } from './reservation.service';
import { ReservationResolver } from './reservation.resolver';
import { Desk } from '../typeorm/entities/Desk';
import { Reservation } from '../typeorm/entities/Reservation';
import { User } from '../typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation, Desk, User]),
    AbilityModule,
    DeskModule,
  ],
  providers: [ReservationService, ReservationResolver],
})
export class ReservationModule {}
