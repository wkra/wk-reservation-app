import { Injectable, UnauthorizedException } from '@nestjs/common';
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

  async createUser(username: string, password: string) {
    const regularUserType = await this.userTypeRepository.findOneBy({ id: 2 });
    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(password, salt);

    const newUser = await this.userRepository.create({
      username,
      password: hash,
      createdAt: new Date(),
      userType: regularUserType,
    });
    return this.userRepository.save(newUser);
  }

  // TODO move to auth module
  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    const foundUser = await this.userRepository.findOneBy({ username });
    if (foundUser && (await bcrypt.compare(password, foundUser.password))) {
      const { password, ...result } = foundUser;
      return result;
    }
    throw new UnauthorizedException();
  }
}
