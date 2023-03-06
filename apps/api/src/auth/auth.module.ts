import { JwtStrategy } from './strategies/jwt.stategy';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { User } from 'src/typeorm/entities/User';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AbilityModule } from 'src/ability/ability.module';

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
