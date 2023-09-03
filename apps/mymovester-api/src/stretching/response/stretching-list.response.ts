import {
  StretchingEffectType,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';

export interface IStretchingListDTO {
  id: number;
  title: string;
  mainCategory: StretchingMainCategoryType;
  subCategory: StretchingSubCategoryType;
  effect: StretchingEffectType;
  imageUrl: string;
}

export class StretchingListResponse {
  total: number;
  stretchingList: IStretchingListDTO[];

  constructor(total: number, stretchingList: IStretchingListDTO[]) {
    this.total = total;
    this.stretchingList = stretchingList;
  }
}
