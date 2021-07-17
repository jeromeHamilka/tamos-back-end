import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { DurationInterceptor } from './interceptors/duration.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  app.useGlobalInterceptors(new DurationInterceptor());
  const configService = app.get(ConfigService);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
