import { NestFactory } from '@nestjs/core';
import { BackofficeApiModule } from './backoffice-api.module';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { SentryInterceptor } from '@app/common/sentry.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(BackofficeApiModule);

  Sentry.init({
    dsn: process.env.SENTRY_DSN_MYMOVESTER,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new WebhookInterceptor());

  await app.listen(3001);
  Logger.log(`🚀mymovester-api running on port 3001`);
}
bootstrap();
