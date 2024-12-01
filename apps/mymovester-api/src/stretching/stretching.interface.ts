import { IUser } from '../user/user.interface';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingListResponse } from './response/stretching-list.response';

export interface IStretchingService {
  getStretchingById(
    id: number,
    user?: IUser,
  ): Promise<StretchingDetailResponse>;

  getStretchingList(
    user: IUser,
    request: GetStretchingListRequest,
  ): Promise<StretchingListResponse>;
}
