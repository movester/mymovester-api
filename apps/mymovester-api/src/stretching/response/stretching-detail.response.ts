import {
  StretchingEffectType,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';

export interface IStretchingDetailDTO {
  id: number;
  title: string;
  mainCategory: StretchingMainCategoryType;
  subCategory: StretchingSubCategoryType;
  effectList: StretchingEffectType[];
  imageList: string[];
  techniqueList: string[];
  collect: number;
  set: number;
  precautionList: string[];
  videoUrl: string;
  isLike: boolean;
}

export class StretchingDetailResponse implements IStretchingDetailDTO {
  id: number;
  title: string;
  mainCategory: StretchingMainCategoryType;
  subCategory: StretchingSubCategoryType;
  effectList: StretchingEffectType[];
  imageList: string[];
  techniqueList: string[];
  collect: number;
  set: number;
  precautionList: string[];
  videoUrl: string;
  isLike: boolean;

  constructor(stretchingDetail: IStretchingDetailDTO) {
    this.id = stretchingDetail.id;
    this.title = stretchingDetail.title;
    this.mainCategory = stretchingDetail.mainCategory;
    this.subCategory = stretchingDetail.subCategory;
    this.effectList = stretchingDetail.effectList;
    this.imageList = stretchingDetail.imageList;
    this.techniqueList = stretchingDetail.techniqueList;
    this.collect = stretchingDetail.collect;
    this.set = stretchingDetail.set;
    this.precautionList = stretchingDetail.precautionList;
    this.videoUrl = stretchingDetail.videoUrl;
    this.isLike = stretchingDetail.isLike;
  }
}
