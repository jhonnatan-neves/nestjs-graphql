import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '../config/config.module';
import {ConfigService} from '../config/config.service';
import {ConnectionOptions} from 'typeorm';
import {Configuration} from '../config/config.enum';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: config.get(Configuration.DB_TYPE) as 'postgres',
        host: config.get(Configuration.DB_HOST),
        username: config.get(Configuration.DB_USERNAME),
        port: Number(config.get(Configuration.DB_PORT)),
        database: config.get(Configuration.DB_DATABASE),
        password: config.get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
      } as ConnectionOptions;
    },
  }),
];
