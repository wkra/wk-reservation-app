import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { UserType } from '../typeorm/entities/UserType';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>, // private jwt: JwtService,
  ) {}

  async create(username: string, password: string): Promise<any> {
    const usernameExist = await this.findOne(username);

    if (usernameExist) {
      throw new BadRequestException('User with this username exist.');
    }

    const regularUserType = await this.userTypeRepository.findOneBy({
      isDefaulUserType: true,
    });
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await this.userRepository.create({
      username,
      password: hash,
      createdAt: new Date(),
      userType: regularUserType,
    });
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async findOne(username: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { username },
      relations: { userType: true },
    });
  }
}
