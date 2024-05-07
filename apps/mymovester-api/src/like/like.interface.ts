import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { GetUserStretchingLikeListRequest } from 'apps/mymovester-api/src/like/request/get-user-stretching-like-request';
import { UserStretchingLikeListResponse } from 'apps/mymovester-api/src/stretching/response/user-stretching-like-list.response';

export interface ILikeService {
  createUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<object>;

  createUserStretchingLikeV2(request: {
    userId: number;
    stretchingId: number;
  }): Promise<void>;

  deleteUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<object>;

  deleteUserStretchingLikeV2(request: {
    userId: number;
    stretchingId: number;
  }): Promise<void>;

  getUserStretchingLikeList(
    request: GetUserStretchingLikeListRequest,
    userId: number,
  ): Promise<UserStretchingLikeListResponse>;

  getUserStretchingLikeByUserIdAndStretchingId(
    userId: number,
    stretchingId: number,
  ): Promise<UserStretchingLike>;
}
