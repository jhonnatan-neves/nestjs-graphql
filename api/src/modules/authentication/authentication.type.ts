import {Field, ObjectType} from '@nestjs/graphql';
import {User} from '../user/user.entity';

@ObjectType()
export class SinginType {
  @Field()
  token: string;

  @Field()
  user: User;
}
