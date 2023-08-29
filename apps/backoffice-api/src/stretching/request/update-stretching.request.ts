import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import {
  StretchingEffectType,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';

export class UpdateStretchingRequest {
  @IsNotEmpty()
  @Length(1, 50)
  title: string;

  @IsNotEmpty()
  @IsEnum(StretchingMainCategoryType)
  mainCategory: StretchingMainCategoryType;

  @IsNotEmpty()
  @IsEnum(StretchingSubCategoryType)
  subCategory: StretchingSubCategoryType;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(StretchingEffectType, { each: true })
  effectList: StretchingEffectType[];

  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  imageList: string[];

  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  techniqueList: string[];

  @IsNotEmpty()
  @IsInt()
  collect: number;

  @IsNotEmpty()
  @IsInt()
  set: number;

  @IsNotEmpty()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(9)
  precautionList: string[];

  videoUrl: string;
}
