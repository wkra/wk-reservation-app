import {
  Column,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Reservation } from './Reservation';
import { UserType } from './UserType';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;

  @OneToMany(() => Reservation, (reservation) => reservation.desk)
  reservations: Reservation[];

  @ManyToOne(() => UserType, (userType) => userType.users)
  userType: UserType;
}
