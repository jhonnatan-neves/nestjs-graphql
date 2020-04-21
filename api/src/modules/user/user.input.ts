import {Field, InputType} from "@nestjs/graphql";
import {IsInt, IsNotEmpty, IsString} from "class-validator";

@InputType()
export class CreateUsersInput {
  @Field()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsInt()
  type: number;
}
