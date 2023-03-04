import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtUserStrategy extends PassportStrategy(Strategy, 'jwtUser') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.API_JWT_SECRET,
    });
  }

  async validate(payload: any) {
    console.log('user strategy');
    return {
      id: payload.sub,
      username: payload.username,
    };
  }
}
