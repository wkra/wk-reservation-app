import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DeleteResult, Repository } from 'typeorm';
import { Reservation } from '../typeorm/entities/Reservation';
import { Desk } from '../typeorm/entities/Desk';
import { User } from '../typeorm/entities/User';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectRepository(Desk) private deskRepository: Repository<Desk>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    deskId: number,
    date: Date,
  ): Promise<Reservation> {
    const user = await this.userRepository.findOneBy({ id: userId });
    const desk = await this.deskRepository.findOneBy({ id: deskId });

    const reservation = await this.reservationRepository.create({
      date,
      createdAt: new Date(),
    });
    reservation.user = user;
    reservation.desk = desk;
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<boolean> {
    const reservation: DeleteResult = await this.reservationRepository.delete(
      id,
    );
    return reservation.affected > 0;
  }

  async findAll(date: Date): Promise<Reservation[]> {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return await this.reservationRepository.find({
      relations: ['desk', 'user'],
      where: {
        date: Between(
          new Date(year, month, day, 0),
          new Date(year, month, day, 23, 59, 59),
        ),
      },
    });
  }

  async findOneById(id: number): Promise<Reservation | undefined> {
    return await this.reservationRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }

  async findByDeskIdAndDate(
    deskId: number,
    date: Date,
  ): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: {
        date,
        desk: {
          id: deskId,
        },
      },
    });
  }

  async findByUserIdAndDate(
    userId: number,
    date: Date,
  ): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: {
        date,
        user: {
          id: userId,
        },
      },
    });
  }
}
