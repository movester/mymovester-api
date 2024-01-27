import { DataSource, DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserStretchingLike } from '../entity/user-stretching-like.entity';

@Injectable()
export class UserStretchingLikeRepository extends Repository<UserStretchingLike> {
  constructor(dataSource: DataSource) {
    super(UserStretchingLike, dataSource.createEntityManager());
  }

  async createUserStretchingLike(request: {
    userId: number;
    stretchingId: number;
  }): Promise<UserStretchingLike> {
    const userStretchingLike: UserStretchingLike = this.create({
      userId: request.userId,
      stretchingId: request.stretchingId,
    });

    await this.save(userStretchingLike);
    return userStretchingLike;
  }

  async findByUserIdAndStretchingId(request: {
    userId: number;
    stretchingId: number;
  }): Promise<UserStretchingLike> {
    return this.createQueryBuilder('userStretchingLike')
      .where('userStretchingLike.userId = :userId', { userId: request.userId })
      .andWhere('userStretchingLike.stretchingId = :stretchingId', {
        stretchingId: request.stretchingId,
      })
      .getOne();
  }

  async deleteByUserIdAndStretchingId(request: {
    userId: number;
    stretchingId: number;
  }): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .from(UserStretchingLike)
      .where('userId = :userId', { userId: request.userId })
      .andWhere('stretchingId = :stretchingId', {
        stretchingId: request.stretchingId,
      })
      .execute();
  }
}
