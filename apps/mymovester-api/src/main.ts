import { HttpExceptionFilter } from '@app/common/exception/http-exception.filter';
import { SentryInterceptor } from '@app/common/sentry.interceptor';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import { swaggerBuilder } from './config/swagger';
import { MymovesterModule } from './mymovester.module';

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
  // TODO: FE 논의 필요
  // app.useGlobalPipes(new ValidationPipe({ transform: true })); // DTO class-validator
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
