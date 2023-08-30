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
  page?: number = 1;

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
