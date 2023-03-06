import { Field, ObjectType } from '@nestjs/graphql';

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
