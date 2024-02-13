import { Module } from '@nestjs/common';
import { StretchingController } from './stretching.controller';
import { StretchingService } from './stretching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { StretchingTechniqueRepository } from '@app/persistence/domain/stretching/repository/stretching-technique.repository';
import { StretchingPrecautionRepository } from '@app/persistence/domain/stretching/repository/stretching-precaution.repository';
import { LikeService } from '../like/like.service';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stretching])],
  controllers: [StretchingController],
  providers: [
    StretchingService,
    StretchingRepository,
    StretchingEffectRepository,
    StretchingImageRepository,
    StretchingTechniqueRepository,
    StretchingPrecautionRepository,
    UserStretchingLikeRepository,
    LikeService,
  ],
})
export class StretchingModule {}
