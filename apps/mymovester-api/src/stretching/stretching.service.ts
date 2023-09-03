import { StretchingEffect } from '@app/persistence/domain/stretching/entity/stretching-effect.entity';
import { StretchingImage } from '@app/persistence/domain/stretching/entity/stretching-image.entity';
import { StretchingPrecaution } from '@app/persistence/domain/stretching/entity/stretching-precaution.entity';
import { StretchingTechnique } from '@app/persistence/domain/stretching/entity/stretching-technique.entity';
import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { StretchingPrecautionRepository } from '@app/persistence/domain/stretching/repository/stretching-precaution.repository';
import { StretchingTechniqueRepository } from '@app/persistence/domain/stretching/repository/stretching-technique.repository';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IStretchingDetailDTO,
  StretchingDetailResponse,
} from './response/stretching-detail.response';

@Injectable()
export class StretchingService {
  constructor(
    @InjectRepository(StretchingRepository)
    private stretchingRepository: StretchingRepository,

    @InjectRepository(StretchingEffectRepository)
    private stretchingEffectRepository: StretchingEffectRepository,

    @InjectRepository(StretchingImageRepository)
    private stretchingImageRepository: StretchingImageRepository,

    @InjectRepository(StretchingPrecautionRepository)
    private stretchingPrecautionRepository: StretchingPrecautionRepository,

    @InjectRepository(StretchingTechniqueRepository)
    private stretchingTechniqueRepository: StretchingTechniqueRepository,
  ) {}

  async getStretchingById(id: number): Promise<StretchingDetailResponse> {
    const stretching: Stretching = await this.stretchingRepository.findOne({
      where: { id },
    });

    if (!stretching) {
      throw new NotFoundException(
        `해당 스트레칭이 존재하지 않습니다. id: ${id}`,
      );
    }

    const effectList: StretchingEffect[] =
      await this.stretchingEffectRepository.find({
        where: { stretchingId: id },
      });

    const imageList: StretchingImage[] =
      await this.stretchingImageRepository.find({
        where: { stretchingId: id },
      });

    const techniqueList: StretchingTechnique[] =
      await this.stretchingTechniqueRepository.find({
        where: { stretchingId: id },
      });

    const precautionList: StretchingPrecaution[] =
      await this.stretchingPrecautionRepository.find({
        where: { stretchingId: id },
      });

    // 스트레칭 상세 조회시 조회수 1 up
    stretching.addView();
    stretching.save();

    const StretchingDetailResponseParam: IStretchingDetailDTO = {
      id: stretching.id,
      title: stretching.title,
      mainCategory: stretching.mainCategory,
      subCategory: stretching.subCategory,
      collect: stretching.collect,
      set: stretching.set,
      videoUrl: stretching.videoUrl,
      effectList: effectList.map((stretchingEffect) => stretchingEffect.effect),
      imageList: imageList.map((stretchingImage) => stretchingImage.url),
      techniqueList: techniqueList.map((technique) => technique.description),
      precautionList: precautionList.map(
        (precaution) => precaution.description,
      ),
    };

    return new StretchingDetailResponse(StretchingDetailResponseParam);
  }
}
