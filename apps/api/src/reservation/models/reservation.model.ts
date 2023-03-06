import { Field, ObjectType } from '@nestjs/graphql';
import {DeskModel} from '../../desk/models/desk.model';
import {UserModel} from '../../user/models/user.model';

@ObjectType({
  description: 'Reservation model',
})
export class ReservationModel {
  @Field(() => Number )
  id: number;

  @Field(() => Date )
  date: Date;

  @Field(() => DeskModel )
  desk: DeskModel;

  @Field(() => UserModel )
  user: UserModel;
}
