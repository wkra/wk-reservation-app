import { Field, ObjectType } from '@nestjs/graphql';
import { UserModel } from './user.model';
import { UserTypeModel } from './userType.model';

@ObjectType({
  description: 'Full User model with user',
})
export class FullUserModel extends UserModel {
  @Field(() => UserTypeModel)
  userType: UserTypeModel;
}
