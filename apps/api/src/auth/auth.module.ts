import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stategy';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { User } from './../typeorm/entities/User';
import { UserModule } from './../user/user.module';
import { AbilityModule } from './../ability/ability.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.API_JWT_SECRET,
      signOptions: { expiresIn: '60000s' },
    }),
    UserModule,
    PassportModule,
    AbilityModule,
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
