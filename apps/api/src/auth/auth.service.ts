import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    //TODO ANY
    const payload = { username: user.username, sub: user.id };

    return this.jwtService.sign(payload);
  }

  decodeJwt(token: string) {
    return this.jwtService.decode(token);
  }
}
