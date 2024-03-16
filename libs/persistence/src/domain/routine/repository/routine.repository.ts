import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Routine } from '@app/persistence/domain/routine/entity/routine.entity';

@Injectable()
export class RoutineRepository extends Repository<Routine> {
  constructor(private readonly dataSource: DataSource) {
    super(Routine, dataSource.createEntityManager());
  }

  async findByUserIdAndCount(userId: number): Promise<[Routine[], number]> {
    return await this.createQueryBuilder(`routine`)
    .select()
    .where(`routine.userId = :userId`, {userId})
    .orderBy(`routine.order`, 'DESC')
    .getManyAndCount();
  }

  async findByUserId(userId: number): Promise<Routine[]> {
    return await this.createQueryBuilder(`routine`)
    .select()
    .where(`routine.userId = :userId`, {userId})
    .orderBy(`routine.order`, 'ASC')
    .getMany();
  }

  async saveRoutine(
    userId: number,
    title: string,
    order: number,
  ): Promise<void> {
    await this.dataSource.transaction(async entityManager => {
      await entityManager.create(Routine, {
        userId,
        title,
        order,
      })
      .save();
    })
  }
}
