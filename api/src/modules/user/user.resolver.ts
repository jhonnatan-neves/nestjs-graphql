import {Args, Mutation, Resolver} from '@nestjs/graphql';
import {UserService} from "./user.service";
import {User} from "./user.entity";
import {JwtAuthGuard} from "../../shared/guard/auth.guard";
import {UseGuards} from "@nestjs/common";
import {CreateUsersInput} from "./user.input";
import {Roles} from "../../shared/decorator/roles.decorator";
import {RolesGuard} from "../../shared/guard/roles.guard";
import {UserType} from "../../shared/enum/user.enum";

@Resolver('User')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserResolver {
  constructor(
    private readonly _userService: UserService
  ) {
  }

  @Mutation(() => User)
  @Roles(UserType.ADMIN)
  async createUser(@Args('input') input: CreateUsersInput): Promise<User> {
    return await this._userService.createUser(input);
  }
}
