import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptionsFactory } from '@app/common/upload/multer';
import { UploadController as ProductUploadController } from 'apps/mymovester-api/src/upload/upload.controller';
import { UploadController as BackofficeUploadController } from 'apps/backoffice-api/src/upload/upload.controller';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
  ],
  controllers: [ProductUploadController, BackofficeUploadController],
  providers: [UploadService],
})
export class UploadModule {}
