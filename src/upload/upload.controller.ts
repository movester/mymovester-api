import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private uploadService: UploadService) {}
  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.MulterS3.File) {
    return this.uploadService.uploadFile(file);
  }
}
