import {
  StretchingEffectType,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '../../common/enum';

export interface IStretchingListDTO {
  id: number;
  title: string;
  mainCategory: StretchingMainCategoryType;
  subCategory: StretchingSubCategoryType;
  effectList: StretchingEffectType[];
  views: number;
  createdAt: Date;
}

export class StretchingListResponse {
  total: number;
  stretchingList: IStretchingListDTO[];

  constructor(total: number, stretchingList: IStretchingListDTO[]) {
    this.total = total;
    this.stretchingList = stretchingList;
  }
}
