import {
  IsNotEmpty,
} from 'class-validator';

export class KakaoLoginRequest {
  @IsNotEmpty()
  socialUid: string;
}

export class UserLeaveRequest{
  @IsNotEmpty()
  socialUid: string;
}

export class UserRequest {
  @IsNotEmpty()
  userId: number;
}
