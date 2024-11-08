import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ResponseInterceptor } from './response-interceptor';

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

  app.useGlobalInterceptors(new ResponseInterceptor());

  const configService = app.get(ConfigService);
  app.enableCors({
    origin: configService.getOrThrow<string>('CLIENT_URL'),
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Refresh', 'Cookies'],
  });
  const port = configService.getOrThrow('APP_PORT');

  await app.listen(port);
}
bootstrap();
