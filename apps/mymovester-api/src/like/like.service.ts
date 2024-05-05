import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';
import { StretchingEffectRepository } from '@app/persistence/domain/stretching/repository/stretching-effect.repository';
import { StretchingImageRepository } from '@app/persistence/domain/stretching/repository/stretching-image.repository';
import { StretchingRepository } from '@app/persistence/domain/stretching/repository/stretching.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IStretchingListDTO } from '../stretching/response/stretching-list.response';
import { UserStretchingLikeListResponse } from '../stretching/response/user-stretching-like-list.response';
import { GetUserStretchingLikeListRequest } from './request/get-user-stretching-like-request';

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

  // TODO: deprecated
  async createUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<object> {
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

    return {
      isSuccess: true,
    };
  }

  // TODO: 트랜잭션
  async createUserStretchingLikeV2(request: {
    userId: number;
    stretchingId: number;
  }): Promise<void> {
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
    return;
  }

  // TODO: deprecated
  async deleteUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<object> {
    const result =
      await this.userStretchingLikeRepository.deleteByUserIdAndStretchingId(
        request,
      );

    if (result.affected === 0) {
      throw new NotFoundException(
        `좋아요 하지 않은 스트레칭입니다. id: ${request.stretchingId}`,
      );
    }

    return {
      isSuccess: true,
    };
  }

  async deleteUserStretchingLikeV2(request: {
    userId: number;
    stretchingId: number;
  }): Promise<void> {
    const result =
      await this.userStretchingLikeRepository.deleteByUserIdAndStretchingId(
        request,
      );

    if (result.affected === 0) {
      throw new NotFoundException(
        `좋아요 하지 않은 스트레칭입니다. id: ${request.stretchingId}`,
      );
    }
    return;
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

    const stretchingSummaries =
      await this.stretchingRepository.findStretchingSummaries(
        userStretchingLikes.map((s) => s.stretchingId),
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
          isLike: true,
        };
      },
    );

    return new UserStretchingLikeListResponse(
      userStretchingLikesTotal,
      stretchingList,
    );
  }

  async getUserStretchingLikeByUserIdAndStretchingId(
    userId: number,
    stretchingId: number,
  ): Promise<UserStretchingLike> {
    return await this.userStretchingLikeRepository.findOne({
      where: { userId, stretchingId },
    });
  }
}
