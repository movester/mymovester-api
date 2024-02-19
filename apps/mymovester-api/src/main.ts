import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/node';
import { WebhookInterceptor } from '@app/common/webhook.interceptor';
import { SentryInterceptor } from '@app/common/sentry.interceptor';
import { MymovesterModule } from './mymovester.module';
import { swaggerBuilder } from 'apps/mymovester-api/src/config/swagger';

async function bootstrap() {
  const app = await NestFactory.create(MymovesterModule);
  app.setGlobalPrefix('api/v1');
  swaggerBuilder(app);

  const port = process.env.MYMOVESTER_PORT;
  Sentry.init({
    dsn: process.env.SENTRY_DSN_MYMOVESTER,
  });
  app.useGlobalInterceptors(new SentryInterceptor());
  app.useGlobalInterceptors(new WebhookInterceptor());

  await app.listen(port);
  Logger.log(`🚀mymovester-api running on port ${port}`);
}

bootstrap();
