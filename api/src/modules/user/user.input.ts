import {Field, InputType} from "@nestjs/graphql";
import {IsEmail, IsInt, IsNotEmpty, IsString, Validate} from "class-validator";
import {EntityExists} from "../../shared/validator/entity-exists.constraint";
import {User} from "./user.entity";

@InputType()
export class CreateUsersInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  @Validate(EntityExists, [User])
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
