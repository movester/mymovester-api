import { SocialType } from '@app/common';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserTermsRequest } from 'apps/mymovester-api/src/user/request/create-user-terms.request';
import { UpdateUserRequest } from 'apps/mymovester-api/src/user/request/update-user.request';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';
import { IUserService } from 'apps/mymovester-api/src/user/user.interface';

@Injectable()
export class UserService implements IUserService {
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
    profileUrl: string;
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
      id: user.id,
      creatdAt: user.createdAt,
      email: user.email,
      nickName: user.nickName,
      socialType: user.socialType,
      socialUid: user.socialUid,
      phoneNumber: user.phoneNumber,
      birthAt: user.birthAt,
      gender: user.gender,
      deletedAt: user.deletedAt,
      profileUrl: user.profileUrl,
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.deleteUser(id);
  }

  async updateUser(id: number, request: UpdateUserRequest): Promise<null> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException(
        `존재하지 않는 회원입니다 (문의 mus2021mus@gmail.com)`,
      );
    }

    await this.userRepository.updateUser(
      id,
      request.nickName,
      request.profileUrl,
    );

    return null;
  }

  async createUserTerms(
    id: number,
    request: CreateUserTermsRequest,
  ): Promise<void> {
    const user: User = await this.userRepository.findOne({
      where: { id },
    });

    if (user === null) {
      throw new NotFoundException(
        `존재하지 않는 회원입니다 (문의 mus2021mus@gmail.com)`,
      );
    }

    if (!(request.isTermAgreed && request.isPrivacyPolicyAgreed)) {
      throw new BadRequestException(`필수 동의 항목입니다.`);
    }

    await this.userRepository.updateUserTerms(
      id,
      request.isTermAgreed,
      request.isPrivacyPolicyAgreed,
      request.isMarketingAgreed,
    );

    return;
  }
}
