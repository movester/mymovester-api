import { Gender, SocialType } from '@app/common';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { CreateUserTermsRequest } from 'apps/mymovester-api/src/user/request/create-user-terms.request';
import { UpdateUserRequest } from 'apps/mymovester-api/src/user/request/update-user.request';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';

export interface IUserService {
  getUserBySocialUid(socialUid: string): Promise<User>;

  createUser(user: {
    socialUid: string;
    socialType: SocialType;
    name: string;
    email: string;
  }): Promise<User>;

  getUser(id: number): Promise<UserResponse>;

  deleteUser(id: number): Promise<void>;

  updateUser(id: number, request: UpdateUserRequest): Promise<null>;

  createUserTerms(id: number, request: CreateUserTermsRequest): Promise<void>;
}
export interface IUser {
  id: number;
  socialUuid: string;
  nickName: string;
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
