import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserRepository} from "./user.repository";
import {User} from "./user.entity";
import {CreateUsersInput} from "./user.input";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository
  ) {
  }

  public async createUser(input: CreateUsersInput): Promise<User> {
    return await this._userRepository.create(input).save();
  }
}
