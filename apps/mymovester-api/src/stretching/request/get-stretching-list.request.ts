import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsString, Length } from 'class-validator';
import {
  StretchingListOrderFilter,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';
import { toNumber } from '@app/common/cast';

export class GetStretchingListRequest {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  page = 1;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  size: number;

  @IsString()
  @Length(1, 50)
  title?: string;

  @IsEnum(StretchingMainCategoryType)
  mainCategory?: StretchingMainCategoryType;

  @IsEnum(StretchingSubCategoryType)
  subCategory?: StretchingSubCategoryType;

  @IsEnum(StretchingListOrderFilter)
  orderFilter?: StretchingListOrderFilter = StretchingListOrderFilter.RECENT;
}
