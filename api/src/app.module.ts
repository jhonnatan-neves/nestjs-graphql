import {Module} from '@nestjs/common';
import {ConfigModule} from './config/config.module';
import {ConfigService} from "./config/config.service";
import {Configuration} from "./config/config.enum";

@Module({
  imports: [ConfigModule],
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
