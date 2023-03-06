import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'User Type model',
})
export class UserTypeModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  label: string;

  @Field(() => Boolean)
  isAdmin: boolean;

  @Field(() => Boolean)
  isDefaulUserType: boolean;
}
