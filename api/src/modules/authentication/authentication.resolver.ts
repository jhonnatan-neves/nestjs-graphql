import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {AuthenticationService} from "./authentication.service";
import {SinginType} from "./authentication.type";
import {SinginInput, SingupCreateInput} from "./authentication.input";
import {User} from "../user/user.entity";

@Resolver('Authentication')
export class AuthenticationResolver {
  constructor(
    private readonly _authenticationService: AuthenticationService
  ) {
  }

  @Query(() => SinginType)
  public async signin(
    @Args('input') input: SinginInput
  ): Promise<SinginType> {
    return await this._authenticationService.signin(input);
  }

  @Mutation(() => User)
  public async singup(@Args('input') input: SingupCreateInput): Promise<User> {
    return await this._authenticationService.singup(input);
  }
}
