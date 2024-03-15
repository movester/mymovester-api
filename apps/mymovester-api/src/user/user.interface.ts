import { Gender, SocialType } from '@app/common';

export interface IUser {
  id: number;
  socialUuid: string;
}

export interface IUserDetail {
  id: number;
  creatdAt: Date;
  email: string;
  nickName: string;
  socialType: SocialType;
  socialUid: string;
  phoneNumber: string;
  birthAt: Date;
  gender: Gender;
  profileUrl: string;
  deletedAt: Date;
}
