import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import { SharedModule } from './shared/shared.module';
import { useContainer, ContainerInterface } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      validationError: { target: false }
    })
  );

  useContainer(app.select(SharedModule) as ContainerInterface, {fallback: true});

  await app.listen(AppModule.port);
}

bootstrap();
