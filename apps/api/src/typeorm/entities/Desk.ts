import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Reservation} from './Reservation';

@Entity({name: 'desks'})
export class Desk {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column({default: 10})
  order: number

  @Column()
  createdAt: Date

  @OneToMany(() => Reservation, (reservation) => reservation.desk)
  reservations: Reservation[]
}
