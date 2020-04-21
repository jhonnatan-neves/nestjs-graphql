import {PassportStrategy} from '@nestjs/passport';
import {Strategy, ExtractJwt} from 'passport-jwt';
import {ConfigService} from '../../../config/config.service';
import {Configuration} from '../../../config/config.enum';
import {InjectRepository} from '@nestjs/typeorm';
import {UnauthorizedException, Injectable} from '@nestjs/common';
import {AuthenticationRepository} from "../authentication.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthenticationRepository)
    private readonly _authenticationRepository: AuthenticationRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const {email} = payload;
    const user = await this._authenticationRepository.findOne({
      where: {email},
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

export interface IJwtPayload {
  id: string;
  email: string;
  type: number;
  iat?: Date;
}
