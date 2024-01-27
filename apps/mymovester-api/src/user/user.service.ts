import { SocialType } from '@app/common';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async getUserBySocialUid(socialUid: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { socialUid },
    });
  }

  async createUser(user: {
    socialUid: string;
    socialType: SocialType;
    name: string;
    email: string;
  }): Promise<User> {
    return await this.userRepository.createUser(user);
  }

  async getUser(id: number): Promise<UserResponse> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException(
        `존재하지 않는 회원입니다 (문의 mus2021mus@gmail.com)`,
      );
    }

    return new UserResponse({
      id : user.id,
      creatdAt : user.createdAt,
      email : user.email,
      nickName : user.nickName,
      socialType : user.socialType,
      socialUid : user.socialUid,
      phoneNumber : user.phoneNumber,
      birthAt : user.birthAt,
      gender : user.gender,
      deletedAt : user.deletedAt,
      profileUrl: user.profileUrl,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }
}
