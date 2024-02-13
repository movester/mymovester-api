import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { toNumber } from '@app/common/cast';

export class GetUserStretchingLikeListRequest {
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  page = 1;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsInt()
  size: number;
}
