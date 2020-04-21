import {Module} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import {AuthenticationResolver} from './authentication.resolver';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthenticationRepository} from "./authentication.repository";
import {JwtStrategy} from "./strategies/jwt.strategy";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../../config/config.module";
import {ConfigService} from "../../config/config.service";
import {Configuration} from "../../config/config.enum";

const orm = [AuthenticationRepository];

@Module({
  imports: [
    TypeOrmModule.forFeature(orm),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(_configService: ConfigService) {
        return {
          secret: _configService.get(Configuration.JWT_SECRET),
          signOptions: {
            expiresIn: _configService.get(Configuration.JWT_EXPIRE_IN),
          },
        };
      },
    }),
  ],
  providers: [
    AuthenticationService,
    AuthenticationResolver,
    JwtStrategy,
    ConfigService
  ],
  exports: [
    AuthenticationResolver,
    JwtStrategy,
    PassportModule
  ]
})
export class AuthenticationModule {
}
