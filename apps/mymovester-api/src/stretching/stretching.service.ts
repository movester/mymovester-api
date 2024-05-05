import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
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

    private likeService: LikeService,
  ) {}

  async getStretchingById(
    id: number,
    userId?: number,
  ): Promise<StretchingDetailResponse> {
    const stretching: Stretching =
      await this.stretchingRepository.findStretchingDetail(id);

    if (!stretching) {
      throw new NotFoundException(
        `해당 스트레칭이 존재하지 않습니다. id: ${id}`,
      );
    }

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
      effectList: stretching.stretchingEffects.map(
        (stretchingEffect) => stretchingEffect.effect,
      ),
      imageList: stretching.stretchingImages.map(
        (stretchingImage) => stretchingImage.url,
      ),
      techniqueList: stretching.stretchingTechniques.map(
        (technique) => technique.description,
      ),
      precautionList: stretching.stretchingPrecautions.map(
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

    const stretchingSummaries =
      await this.stretchingRepository.findStretchingSummaries(
        stretchings.map((s) => s.id),
      );

    const stretchingList: IStretchingListDTO[] = stretchingSummaries.map(
      (stretching) => {
        return {
          id: stretching.id,
          title: stretching.title,
          mainCategory: stretching.mainCategory,
          subCategory: stretching.subCategory,
          createdAt: stretching.createdAt,
          effect: stretching.stretchingEffects[0].effect,
          imageUrl: stretching.stretchingImages[0].url,
        };
      },
    );

    return new StretchingListResponse(total, stretchingList);
  }
}
