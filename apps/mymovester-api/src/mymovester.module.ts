import { Module } from '@nestjs/common';
import { StretchingModule } from './stretching/stretching.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StretchingEffect } from '@app/persistence/domain/stretching/entity/stretching-effect.entity';
import { StretchingImage } from '@app/persistence/domain/stretching/entity/stretching-image.entity';
import { StretchingPrecaution } from '@app/persistence/domain/stretching/entity/stretching-precaution.entity';
import { StretchingTechnique } from '@app/persistence/domain/stretching/entity/stretching-technique.entity';
import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { BaseEntityClass } from '@app/persistence/domain/base-entity.entity';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { LikeModule } from './like/like.module';

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
            StretchingTechnique,
            Stretching,
            User,
            UserStretchingLike,
            BaseEntityClass,
          ],
          synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        };
      },
    }),
    StretchingModule,
    AuthModule,
    UserModule,
    LikeModule,
  ],
})
export class MymovesterModule {}
