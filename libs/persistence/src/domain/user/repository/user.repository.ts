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

  async deleteUser(id: number): Promise<void> {
    this.update(id, {
      deletedAt: new Date(),
    })
  }
  
  async updateUser(
    id: number, 
    nickName?: string,
    profileUrl?: string,
  ): Promise<void> {
    await this.createQueryBuilder()
    .update(User)
    .set({
      ...(nickName && {nickName}),
      ...(profileUrl && {profileUrl}),
    })
    .where('id = :id', {id})
    .execute();
  }
}
