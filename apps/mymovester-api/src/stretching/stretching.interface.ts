import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingListResponse } from './response/stretching-list.response';

export interface IStretchingService {
  getStretchingById(
    id: number,
    userId?: number,
  ): Promise<StretchingDetailResponse>;

  getStretchingList(
    request: GetStretchingListRequest,
  ): Promise<StretchingListResponse>;
}
