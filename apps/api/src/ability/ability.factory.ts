import { ReservationModel } from './../reservation/models/reservation.model';
import { FullUserModel } from './../user/models/fullUser.model';
import { InferSubjects, Ability } from '@casl/ability';
import {
  createMongoAbility,
  AbilityBuilder,
  ExtractSubjectType,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Desk } from 'src/typeorm/entities/Desk';
import { Reservation } from 'src/typeorm/entities/Reservation';
import { User } from 'src/typeorm/entities/User';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Delete = 'delete',
  Login = 'login',
}

export type Subjects = InferSubjects<
  typeof User | typeof Desk | typeof Reservation | 'all'
>;

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  defineAbility(fullUser: FullUserModel) {
    const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

    if (fullUser.userType.isAdmin) {
      can(Action.Manage, 'all');
    } else {
      cannot(Action.Create, Desk).because('Only admin can create new desk.');
      cannot(Action.Delete, Desk).because('Only admin can delete desk.');
      cannot(Action.Delete, User, {
        id: { $ne: fullUser.id },
      }).because('You can only delete your reservation.');
      can(Action.Delete, User, {
        id: { $eq: fullUser.id },
      });
    }

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
