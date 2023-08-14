import { Module } from '@nestjs/common';
import { StretchingController } from './stretching.controller';
import { StretchingService } from './stretching.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stretching } from 'src/persistence/entity/stretching.entity';
import { StretchingRepository } from 'src/persistence/repository/stretching.repository';
import { StretchingEffectRepository } from 'src/persistence/repository/stretching-effect.repository';
import { StretchingImageRepository } from 'src/persistence/repository/stretching-image.repository';
import { StretchingTechniqueRepository } from 'src/persistence/repository/stretching-technique.repository';
import { StretchingPrecautionRepository } from 'src/persistence/repository/stretching-precaution.repository';

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
  ],
})
export class StretchingModule {}
