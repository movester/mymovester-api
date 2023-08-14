import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

export const multerOptionsFactory = (
  configService: ConfigService,
): MulterOptions => {
  const s3 = new S3Client({
    region: configService.get('AWS_BUCKET_REGION'),
    credentials: {
      accessKeyId: configService.get('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get('AWS_SECRET_KEY'),
    },
  });

  return {
    storage: multerS3({
      s3,
      bucket: configService.get('AWS_BUCKET_NAME'),
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(_req, file, done) {
        const ext = path.extname(file.originalname); // 파일의 확장자 추출
        const originName = path.basename(file.originalname, ext); // 파일 이름
        done(null, `${originName}_${Date.now()}${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  };
};
