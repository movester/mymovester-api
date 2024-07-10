import { toNumber } from '@app/common/cast';
import {
  StretchingEffectType,
  StretchingListOrderFilter,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Length } from 'class-validator';

export class GetStretchingListRequest {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  page = 1;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  size!: number;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  title: string | null;

  @IsOptional()
  @IsEnum(StretchingMainCategoryType)
  mainCategory: StretchingMainCategoryType | null;

  @IsOptional()
  @IsEnum(StretchingSubCategoryType)
  subCategory: StretchingSubCategoryType | null;

  @IsOptional()
  @IsEnum(StretchingEffectType)
  effect: StretchingEffectType | null;

  @IsEnum(StretchingListOrderFilter)
  orderFilter: StretchingListOrderFilter = StretchingListOrderFilter.RECENT;
}
