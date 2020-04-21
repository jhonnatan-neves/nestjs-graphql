import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {AuthenticationRepository} from "./authentication.repository";
import {SinginInput, SingupCreateInput} from "./authentication.input";
import {SinginType} from "./authentication.type";
import {User} from "../user/user.entity";
import {compare} from 'bcryptjs';
import {JwtService} from "@nestjs/jwt";
import {IJwtPayload} from "./strategies/jwt.strategy";

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(AuthenticationRepository)
    private readonly _authenticationRepository: AuthenticationRepository,
    private readonly _jwtService: JwtService
  ) {
  }

  public async signin(input: SinginInput): Promise<SinginType> {
    const {email, password} = input;
    const user: User | null = await this._authenticationRepository.findOne({
      where: {
        email
      }
    });
    if (!user) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'E-mail ou senha inválido.',
          error: 'Precondition Failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'E-mail ou senha inválido.',
          error: 'Precondition Failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      type: user.type,
    };

    const token = this._jwtService.sign(payload);

    return {token, user};
  }

  public async singup(input: SingupCreateInput): Promise<User> {
    const {email} = input;
    const userExist: User | null = await this._authenticationRepository.findOne({
      where: {
        email,
      },
    });

    if (userExist) {
      throw new HttpException(
        {
          statusCode: HttpStatus.PRECONDITION_FAILED,
          message: 'E-mail já foi cadastrado no sistema.',
          error: 'Precondition Failed',
        },
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return this._authenticationRepository.signup(input);
  }
}
