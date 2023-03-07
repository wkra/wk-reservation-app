import { FullUserWithPasswordModel } from './models/fullUser.model';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { User } from '../typeorm/entities/User';
import { UserType } from '../typeorm/entities/UserType';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserType)
    private userTypeRepository: Repository<UserType>,
  ) {}

  async create(username: string, hashedPassword: string): Promise<User> {
    const userExist = await this.findOne(username);

    if (userExist) {
      throw new BadRequestException('User with this username exist.');
    }

    const defaultUserType = await this.userTypeRepository.findOneBy({
      isDefaulUserType: true,
    });

    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      createdAt: new Date(),
      userType: defaultUserType,
    });
    return await this.userRepository.save(newUser);
  }

  async findOne(
    username: string,
  ): Promise<FullUserWithPasswordModel | undefined> {
    return await this.userRepository.findOne({
      where: { username },
      relations: { userType: true },
    });
  }

  async remove(id: number): Promise<boolean> {
    const reservation: DeleteResult = await this.userRepository.delete(id);

    return reservation.affected > 0;
  }
}
