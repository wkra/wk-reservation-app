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

  @ManyToOne(() => Desk, (desk) => desk.reservations, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  desk: Desk;

  @ManyToOne(() => User, (user) => user.reservations, {
    onDelete: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  user: User;
}
