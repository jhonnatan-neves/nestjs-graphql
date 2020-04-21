import {EntityRepository, Repository} from "typeorm";
import {User} from "../user/user.entity";
import {SingupCreateInput} from "./authentication.input";
import {UserType} from "../../shared/enum/user.enum";
import {genSalt, hash} from 'bcryptjs';

@EntityRepository(User)
export class AuthenticationRepository extends Repository<User> {
  async signup(input: SingupCreateInput): Promise<User> {
    const {email, password, firstName, lastName} = input;
    const salt = await genSalt(12);
    const user = this.create({
      email,
      password: await hash(password, salt),
      firstName,
      lastName,
      type: UserType.USER,
    });
    return await user.save();
  }
}
