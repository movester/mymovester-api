import {
  Controller,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('uploads')
export class UploadController {
  private logger = new Logger('StretchingController');
  constructor(private uploadService: UploadService) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.MulterS3.File) {
    this.logger.verbose(`POST 이미지`);
    return this.uploadService.uploadFile(file);
  }
}
