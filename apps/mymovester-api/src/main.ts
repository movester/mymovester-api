import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { MymovesterModule } from './mymovester.module';
import { HttpExceptionFilter } from '@app/common/exception/http-exception.filter';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { SentryInterceptor } from '@app/common/sentry.interceptor';
import { swaggerBuilder } from './config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MymovesterModule);

  // API versioning
  app.setGlobalPrefix('/api/');
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: '1',
  });

  swaggerBuilder(app); // Inject Swagger
  app.useGlobalPipes(new ValidationPipe({ transform: true })); // DTO class-validator
  app.useGlobalFilters(new HttpExceptionFilter()); // HTTP exception config
  app.useGlobalInterceptors(new SentryInterceptor()); // Sentry Config
  app.useGlobalInterceptors(new WebhookInterceptor()); // Slack Webhook Config

  const port = process.env.MYMOVESTER_PORT;
  Sentry.init({
    dsn: process.env.SENTRY_DSN_MYMOVESTER,
  });

  await app.listen(port);
  Logger.log(`🚀mymovester-api running on port ${port}`);
}

bootstrap();
