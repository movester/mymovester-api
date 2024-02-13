import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';
import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { DefaultResponse } from '@app/common/response/default.response';
import { GetUserStretchingLikeListRequest } from './request/get-user-stretching-like-request';
import { IStretchingListDTO } from '../stretching/response/stretching-list.response';
import { UserStretchingLikeListResponse } from '../stretching/response/user-stretching-like-list.response';
import { StretchingEffect } from '@app/persistence/domain/stretching/entity/stretching-effect.entity';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { Stretching } from '@app/persistence/domain/stretching/entity/stretching.entity';
import { StretchingImage } from '@app/persistence/domain/stretching/entity/stretching-image.entity';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(UserStretchingLikeRepository)
    private userStretchingLikeRepository: UserStretchingLikeRepository,

    @InjectRepository(StretchingRepository)
    private stretchingRepository: StretchingRepository,

    @InjectRepository(StretchingEffectRepository)
    private stretchingEffectRepository: StretchingEffectRepository,

    @InjectRepository(StretchingImageRepository)
    private stretchingImageRepository: StretchingImageRepository,
  ) {}

  // TODO: 트랜잭션
  async createUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<DefaultResponse> {
    const exitedUserStretchingLike: UserStretchingLike =
      await this.userStretchingLikeRepository.findByUserIdAndStretchingId(
        request,
      );
    if (exitedUserStretchingLike !== null) {
      throw new BadRequestException('이미 좋아요된 스트레칭입니다.');
    }

    await this.userStretchingLikeRepository.createUserStretchingLike({
      userId: request.userId,
      stretchingId: request.stretchingId,
    });

    return new DefaultResponse({
      isSuccess: true,
    });
  }

  async deleteUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<DefaultResponse> {
    const result =
      await this.userStretchingLikeRepository.deleteByUserIdAndStretchingId(
        request,
      );

    if (result.affected === 0) {
      throw new NotFoundException(
        `좋아요 하지 않은 스트레칭입니다. id: ${request.stretchingId}`,
      );
    }

    return new DefaultResponse({
      isSuccess: true,
    });
  }

  async getUserStretchingLikeList(
    request: GetUserStretchingLikeListRequest,
    userId: number,
  ): Promise<UserStretchingLikeListResponse> {
    const [userStretchingLikes, userStretchingLikesTotal] =
      await this.userStretchingLikeRepository.findUserStretchingLikeListForProduct(
        {
          page: request.page,
          size: request.size,
          userId,
        },
      );

    const stretchings: Stretching[] = await Promise.all(
      userStretchingLikes.map(
        async (userStretchingLike) =>
          await this.stretchingRepository.findOne({
            where: { id: userStretchingLike.stretchingId },
          }),
      ),
    );

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
    return new UserStretchingLikeListResponse(
      userStretchingLikesTotal,
      stretchingList,
    );
  }
}
