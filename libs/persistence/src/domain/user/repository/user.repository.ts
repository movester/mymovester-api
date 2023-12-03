import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { SocialType } from '@app/common';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(request: {
    socialUid: string;
    socialType: SocialType;
    name: string;
    email: string;
  }): Promise<User> {
    const user: User = this.create({
      email: request.email,
      nickName: request.name,
      socialUid: request.socialUid,
      socialType: request.socialType,
    });

    await this.save(user);
    return user;
  }
}
