import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(request: {
    email: string;
    nickName: string;
    socialUid: string;
  }): Promise<User> {
    const user: User = this.create({
      email: request.email,
      nickName: request.nickName,
      socialUid: request.socialUid,
    });

    await this.save(user);
    return user;
  }
}
