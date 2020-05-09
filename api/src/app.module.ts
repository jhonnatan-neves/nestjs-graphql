import {Module} from '@nestjs/common';
import {ConfigModule} from './config/config.module';
import {ConfigService} from "./config/config.service";
import {Configuration} from "./config/config.enum";
import {AuthenticationModule} from './modules/authentication/authentication.module';
import {GqlModuleOptions, GraphQLModule} from "@nestjs/graphql";
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './database/database.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(_configService: ConfigService) {
        return {
          autoSchemaFile: _configService.get(Configuration.GQL_FILE_NAME),
          playground: _configService.get(Configuration.GQL_PLAYGROUND) === 'true',
          installSubscriptionHandlers: true,
          context: ({req}) => ({req}),
          formatError: err => {
            return err;
            return ({
              ...err.extensions.exception.response
            })
          }
        } as GqlModuleOptions
      }
    }),
    ConfigModule,
    AuthenticationModule,
    UserModule,
    DatabaseModule,
    SharedModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: string | number;

  constructor(
    private readonly _configService: ConfigService
  ) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
