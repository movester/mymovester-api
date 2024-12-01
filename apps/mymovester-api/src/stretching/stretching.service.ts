import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IStretchingService } from 'apps/mymovester-api/src/stretching/stretching.interface';
import { LikeService } from '../like/like.service';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import {
  IStretchingDetailDTO,
  StretchingDetailResponse,
} from './response/stretching-detail.response';
import {
  IStretchingListDTO,
  StretchingListResponse,
} from './response/stretching-list.response';
import { ISlackService } from '@app/common/external/slack/slack.interface';
import { MovesterAccessCheckMessageBuilder } from '@app/common/external/slack/builder/movster-access-check-message.builder';
import { formatDateToString } from '@app/common';
import { IUser } from '../user/user.interface';

@Injectable()
export class StretchingService implements IStretchingService {
  constructor(
    @InjectRepository(StretchingRepository)
    private stretchingRepository: StretchingRepository,
    @Inject('ISlackService')
    private readonly slackService: ISlackService,
    private likeService: LikeService,
  ) {}

  async getStretchingById(
    id: number,
    user?: IUser,
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
    if (user) {
      const userStretchingLike =
        await this.likeService.getUserStretchingLikeByUserIdAndStretchingId(
          user.id,
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

    await this.slackService.sendMarkdownMessage(
      new MovesterAccessCheckMessageBuilder({
        userId: user.id, nickName: user.nickName, accessTime: formatDateToString(new Date()),
      }).build()
    );

    return new StretchingDetailResponse(StretchingDetailResponseParam);
  }

  async getStretchingList(
    user: IUser,
    request: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    const [stretchings, total] =
      await this.stretchingRepository.findStretchingListForProduct(request);

    if (total === 0) {
      return new StretchingListResponse(total, null);
    }
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

    stretchingList.sort((a, b) => b.id - a.id);
    
    await this.slackService.sendMarkdownMessage(
      new MovesterAccessCheckMessageBuilder({
        userId: user.id, nickName: user.nickName, accessTime: formatDateToString(new Date()),
      }).build()
    );

    return new StretchingListResponse(total, stretchingList);
  }
}
