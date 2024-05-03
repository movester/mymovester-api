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
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import {
  IStretchingListDTO,
  StretchingListResponse,
} from './response/stretching-list.response';
import { LikeService } from '../like/like.service';

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

    private likeService: LikeService,
  ) {}

  async getStretchingById(
    id: number,
    userId?: number,
  ): Promise<StretchingDetailResponse> {
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

    let isLike = false;
    if (userId) {
      const userStretchingLike =
        await this.likeService.getUserStretchingLikeByUserIdAndStretchingId(
          userId,
          stretching.id,
        );
      isLike = userStretchingLike !== null;
    }

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
      isLike: isLike,
    };

    return new StretchingDetailResponse(StretchingDetailResponseParam);
  }

  async getStretchingList(
    request: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    const [stretchings, total] =
      await this.stretchingRepository.findStretchingListForProduct(request);

    const stretchingList: IStretchingListDTO[] = await Promise.all(
      stretchings.map(async (stretching) => {
        const stretchingEffect: StretchingEffect =
          await this.stretchingEffectRepository.findOneRepresentativeStretchingEffect(
            stretching.id,
          );

        const stretchingImage: StretchingImage =
          await this.stretchingImageRepository.findOneRepresentativeStretchingImage(
            stretching.id,
          );

        return {
          id: stretching.id,
          title: stretching.title,
          mainCategory: stretching.mainCategory,
          subCategory: stretching.subCategory,
          createdAt: stretching.createdAt,
          effect: stretchingEffect.effect,
          imageUrl: stretchingImage.url,
        };
      }),
    );
    return new StretchingListResponse(total, stretchingList);
  }
}
