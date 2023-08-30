import { NestFactory } from '@nestjs/core';
import { BackofficeApiModule } from './backoffice-api.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(BackofficeApiModule);
  await app.listen(3001);
  Logger.log(`🚀mymovester-api running on port 3001`);
}
bootstrap();
