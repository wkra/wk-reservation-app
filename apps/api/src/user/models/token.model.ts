import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Token model',
})
export class TokenModel {
  @Field(() => String)
  access_token: string;
}
