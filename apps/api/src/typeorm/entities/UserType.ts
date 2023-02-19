import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {User} from './User';

@Entity({name: 'user_types'})
export class UserType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  label: string

  @Column()
  isAdmin: boolean

  @OneToMany(() => User, (user) => user.userType)
  users: User[]
}