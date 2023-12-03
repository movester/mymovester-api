import {
  IsNotEmpty,
} from 'class-validator';

export class KakaoLoginRequest {
  @IsNotEmpty()
  socialUid: string;
}
