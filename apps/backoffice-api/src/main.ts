import { NestFactory } from '@nestjs/core';
import { BackofficeModule } from './backoffice.module';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { SentryInterceptor } from '@app/common/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(BackofficeModule);
  app.setGlobalPrefix('api/v1');

  Sentry.init({
    dsn: process.env.SENTRY_DSN_BACKOFFICE,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new WebhookInterceptor());

  const port = process.env.BACKOFFICE_PORT;

  await app.listen(port);
  Logger.log(`🚀backoffice-api running on port ${port}`);
}
bootstrap();
