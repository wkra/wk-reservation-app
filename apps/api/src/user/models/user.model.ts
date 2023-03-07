import { Field, ObjectType } from '@nestjs/graphql';
import { UserTypeModel } from './userType.model';

@ObjectType({
  description: 'User model',
})
export class UserModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => Date)
  createdAt: Date;
}

@ObjectType({
  description: 'Full User model with userType',
})
export class FullUserModel extends UserModel {
  @Field(() => UserTypeModel)
  userType: UserTypeModel;
}

@ObjectType({
  description: 'Full User model with userType and password',
})
export class FullUserWithPasswordModel extends FullUserModel {
  @Field(() => String)
  password: string;
}
