import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class JwAdminStrategy extends PassportStrategy(Strategy, 'jwtAdmin') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.userRepository.findOne({
      where: {
        id: 1,
      },
      relations: {
        userType: true,
      },
    });

    if (user.userType.isAdmin) {
      return {
        id: payload.sub,
        username: payload.username,
      };
    }

    throw new UnauthorizedException();
  }
}
