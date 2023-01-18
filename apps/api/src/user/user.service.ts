import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from '../typeorm/entities/User'
import {Repository} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
  }

  async createUser(username: string) {
    const newUSer = await this.userRepository.create({
      username,
      createdAt: '2023-01-01' // TODO
    })
    return this.userRepository.save(newUSer)
  }

}
