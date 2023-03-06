import { Field, ObjectType } from '@nestjs/graphql';

export class DeskModel {
  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Number)
  order: number;
}
