import { FullUserModel } from './../user/models/fullUser.model';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { User } from '../typeorm/entities/User';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.userService.findOne(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }

  async login(user: FullUserModel): Promise<string> {
    const payload = { username: user.username, sub: user.id };

    return this.jwtService.sign(payload);
  }

  async register(username, password): Promise<FullUserModel> {
    return await this.userService.create(username, password);
  }
}
