import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Reservation} from './Reservation';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  createdAt: string

  @OneToMany(() => Reservation, (reservation) => reservation.desk)
  reservations: Reservation[]
}
