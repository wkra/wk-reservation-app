import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UserType } from '../typeorm/entities/UserType';
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserType) private userTypeRepository: Repository<UserType>
  ) {
  }

  async createUser(username: string) {
    const regularUserType = await this.userTypeRepository.findOneBy({id: 2})
    const newUSer = await this.userRepository.create({
      username,
      createdAt: new Date(),
      userType: regularUserType
    })
    return this.userRepository.save(newUSer)
  }

}
