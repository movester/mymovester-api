import { Gender, SocialType } from "@app/common";

export interface IUserDTO {
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

export class UserResponse implements IUserDTO {
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

  constructor(user: IUserDTO) {
    this.id = user.id,
    this.creatdAt = user.creatdAt;
    this.email = user.email;
    this.nickName = user.nickName;
    this.socialType = user.socialType;
    this.socialUid = user.socialUid;
    this.phoneNumber = user.phoneNumber;
    this.birthAt = user.birthAt;
    this.gender = user.gender;
    this.profileUrl = user.profileUrl;
    this.deletedAt = user.deletedAt;
  }
}
