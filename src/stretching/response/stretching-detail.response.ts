import {
  StretchingEffectType,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from 'src/common/enum';

export interface IStretchingDetailResponse {
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
  adminId: number;
}

export class StretchingDetailResponse implements IStretchingDetailResponse {
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
  adminId: number;

  constructor(stretchingDetail: {
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
    adminId: number;
  }) {
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
    this.adminId = stretchingDetail.adminId;
  }
}
