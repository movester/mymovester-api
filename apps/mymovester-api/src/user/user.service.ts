import { SocialType } from '@app/common';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  async getUser(): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email: '나현' },
    });
    if (user == null) {
      console.log('null 이래!!');
    }
    return user;
  }
}
