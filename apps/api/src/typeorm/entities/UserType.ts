import { ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'user_types' })
export class UserType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  isAdmin: boolean;

  @Column('boolean', { default: false })
  isDefaulUserType: boolean = false;

  @OneToMany(() => User, (user) => user.userType)
  users: User[];
}
