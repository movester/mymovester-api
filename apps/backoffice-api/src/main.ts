import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT;

  await app.listen(port);
  Logger.log(`🚀backoffice-api running on port ${port}`);
}
bootstrap();
