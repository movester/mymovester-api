import { PersistenceService } from '@app/persistence';
import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserStretchingLike])],
  controllers: [LikeController],
  providers: [
    {
      provide: 'ILikeService',
      useClass: LikeService,
    },
    UserStretchingLikeRepository,
    StretchingRepository,
    StretchingEffectRepository,
    StretchingImageRepository,
    PersistenceService,
  ],
})
export class LikeModule {}
