import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersistenceService } from '@app/persistence';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { UserStretchingLike } from '@app/persistence/domain/like/entity/user-stretching-like.entity';
import { UserStretchingLikeRepository } from '@app/persistence/domain/like/repository/user-stretching-like.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserStretchingLike])],
  controllers: [LikeController],
  providers: [LikeService, UserStretchingLikeRepository, PersistenceService],
})
export class LikeModule {}
