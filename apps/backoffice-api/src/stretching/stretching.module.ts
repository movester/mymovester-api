import { Module } from '@nestjs/common';
import { StretchingController } from './stretching.controller';
import { StretchingService } from './stretching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stretching } from '../persistence/entity/stretching.entity';
import { StretchingRepository } from '../persistence/repository/stretching.repository';
import { StretchingEffectRepository } from '../persistence/repository/stretching-effect.repository';
import { StretchingImageRepository } from '../persistence/repository/stretching-image.repository';
import { StretchingTechniqueRepository } from '../persistence/repository/stretching-technique.repository';
import { StretchingPrecautionRepository } from '../persistence/repository/stretching-precaution.repository';
import { PersistenceService } from '@app/persistence';

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
    PersistenceService,
  ],
})
export class StretchingModule {}
