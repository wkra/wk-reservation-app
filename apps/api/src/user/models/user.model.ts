import {Field, ObjectType} from '@nestjs/graphql';

@ObjectType({
  description: 'User model',
})
export class UserModel {
  @Field(() => String)
  username: string;
}
