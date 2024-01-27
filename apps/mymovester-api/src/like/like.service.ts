import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';
import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { DefaultResponse } from '@app/common/response/default.response';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(UserStretchingLikeRepository)
    private userStretchingLikeRepository: UserStretchingLikeRepository,
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
}
