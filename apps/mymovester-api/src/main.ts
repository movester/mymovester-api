import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { MymovesterModule } from './mymovester.module';
import { HttpExceptionFilter } from '@app/common/exception/http-exception.filter';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { SentryInterceptor } from '@app/common/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(MymovesterModule);
  app.setGlobalPrefix('/api/');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const port = process.env.MYMOVESTER_PORT;
  Sentry.init({
    dsn: process.env.SENTRY_DSN_MYMOVESTER,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new WebhookInterceptor());

  await app.listen(port);
  Logger.log(`🚀mymovester-api running on port ${port}`);
}
bootstrap();
