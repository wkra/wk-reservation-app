import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Desk } from './Desk';
import { User } from './User';

@Entity({ name: 'reservations' })
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  createdAt: Date;

  @Column()
  date: Date;

  @ManyToOne(() => Desk, (desk) => desk.reservations)
  desk: Desk;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;
}
