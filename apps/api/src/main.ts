import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow('APP_PORT');

  await app.listen(port);
}
bootstrap();
