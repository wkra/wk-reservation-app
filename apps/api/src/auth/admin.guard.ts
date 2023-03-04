import { AuthService } from './auth.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor() {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    // console.log(req);
    // const baererString = 'Bearer ';
    // const rawHeaders = context.getArgs()[2].req.rawHeaders;
    // const baerer = rawHeaders.find((el) => el.includes(baererString));
    // if (baerer) {
    //   const token = baerer.replace(baererString, '');
    //   const tokenData = this.authService.decodeJwt(token);

    //   console.log(tokenData);
    // }
    // return false;
    return false;
  }
}
