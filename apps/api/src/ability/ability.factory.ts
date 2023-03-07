import { Injectable } from '@nestjs/common';
import {
  InferSubjects,
  AbilityBuilder,
  ExtractSubjectType,
  Ability,
  PureAbility,
  AbilityClass,
} from '@casl/ability';
import { Desk } from './../typeorm/entities/Desk';
import { Reservation } from './../typeorm/entities/Reservation';
import { User } from './../typeorm/entities/User';
import { FullUserModel } from './../user/models/fullUser.model';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Remove = 'remove',
  Login = 'login',
}

export type Subjects = InferSubjects<
  typeof User | typeof Desk | typeof Reservation | 'all'
>;

export type AppAbility = PureAbility<[Action, Subjects]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

@Injectable()
export class AbilityFactory {
  defineAbility(fullUser: FullUserModel) {
    const { can, cannot, build } = new AbilityBuilder(AppAbility);

    if (fullUser.userType.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Create, Desk).because('Only admin can create new desk.');
      cannot(Action.Remove, Desk).because('Only admin can delete desk.');
      cannot(Action.Remove, User).because('Only admin can delete user.');
      cannot(Action.Remove, Reservation, {
        id: { $ne: fullUser.id },
      }).because('You can remove only your own reservations.');
      can(Action.Remove, Reservation, {
        'user.id': { $eq: fullUser.id },
      });
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
