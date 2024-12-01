import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';
import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { StretchingPrecautionRepository } from '@app/persistence/domain/stretching/repository/stretching-precaution.repository';
import { StretchingTechniqueRepository } from '@app/persistence/domain/stretching/repository/stretching-technique.repository';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from '../like/like.service';
import { StretchingController } from './stretching.controller';
import { StretchingService } from './stretching.service';
import { SlackService } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Stretching])],
  controllers: [StretchingController],
  providers: [
    {
      provide: 'IStretchingService',
      useClass: StretchingService,
    },
    {
      provide: 'ISlackService',
      useClass: SlackService,
    },
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
