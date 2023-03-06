import { FullUserModel } from './../user/models/fullUser.model';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ForbiddenError } from '@casl/ability';
import { RequiredRule, CHECK_ABILITY } from './abilities.decorator';
import { AbilityFactory } from './ability.factory';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';

@Injectable()
export class AbilitiesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactor: AbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rules =
      this.reflector.get<RequiredRule[]>(CHECK_ABILITY, context.getHandler()) ||
      [];

    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user as FullUserModel;

    const ability = this.caslAbilityFactor.defineAbility(user);

    try {
      rules.forEach((rule) =>
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject),
      );

      return true;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw new ForbiddenException(error.message);
      }
    }
  }
}
