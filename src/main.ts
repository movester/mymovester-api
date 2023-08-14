import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;

  await app.listen(port);
  Logger.log(`🚀mymovester-api running on port ${port}`);
}
bootstrap();
