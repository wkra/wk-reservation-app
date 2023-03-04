import { TypeOrmModule } from '@nestjs/typeorm';
import { JwAdminStrategy } from './jwt-admin.stategy';
import { JwtUserStrategy } from './jwt-user.stategy';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.API_JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
  ],
  // providers: [AuthService, JwtStrategy],
  providers: [AuthService, JwtUserStrategy, JwAdminStrategy],
  exports: [AuthService],
})
export class AuthModule {}
