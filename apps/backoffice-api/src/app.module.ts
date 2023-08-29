import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';
import { StretchingModule } from './stretching/stretching.module';
import { StretchingEffect } from './persistence/entity/stretching-effect.entity';
import { StretchingImage } from './persistence/entity/stretching-image.entity';
import { StretchingPrecaution } from './persistence/entity/stretching-precaution.entity';
import { StretchingTechnique } from './persistence/entity/stretching-technique.entity';
import { Stretching } from './persistence/entity/stretching.entity';
import { BaseEntityClass } from './persistence/entity/base-entity.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          // TODO
          entities: [
            __dirname + '/../**/*.entity.{js,ts}',
            StretchingEffect,
            StretchingImage,
            StretchingPrecaution,
            StretchingPrecaution,
            StretchingTechnique,
            Stretching,
            BaseEntityClass,
          ],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        };
      },
    }),
    StretchingModule,
    UploadModule,
  ],
})
export class AppModule {}
