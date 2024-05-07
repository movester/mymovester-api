import { Routine } from '@app/persistence/domain/routine/entity/routine.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoutineRepository extends Repository<Routine> {
  constructor(private readonly dataSource: DataSource) {
    super(Routine, dataSource.createEntityManager());
  }

  async findByUserIdAndCount(userId: number): Promise<[Routine[], number]> {
    return await this.createQueryBuilder(`routine`)
      .select()
      .where(`routine.userId = :userId`, { userId })
      .orderBy(`routine.order`, 'DESC')
      .getManyAndCount();
  }

  async findByUserId(userId: number): Promise<Routine[]> {
    return await this.createQueryBuilder(`routine`)
      .select()
      .where(`routine.userId = :userId`, { userId })
      .orderBy(`routine.order`, 'ASC')
      .getMany();
  }

  async saveRoutine(
    userId: number,
    title: string,
    order: number,
  ): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      await entityManager
        .create(Routine, {
          userId,
          title,
          order,
        })
        .save();
    });
  }

  async deleteRoutines(ids: number[]): Promise<void> {
    await this.softDelete(ids);
  }

  async updateRoutine(id: number, title: string): Promise<void> {
    await this.createQueryBuilder()
      .update(Routine)
      .set({
        ...(title && { title }),
      })
      .where('id = :id', { id })
      .execute();
  }

  async findByIdAndUserId(id: number, userId: number): Promise<Routine> {
    return await this.createQueryBuilder(`routine`)
      .select()
      .where(`routine.id = :id `, { id })
      .andWhere(`routine.userId = :userId`, { userId })
      .getOne();
  }

  async findByIdsAndUserId(ids: number[], userId: number): Promise<Routine[]> {
    return await this.createQueryBuilder(`routine`)
      .leftJoinAndSelect(`routine.routineStretchings`, `routineStretchings`)
      .where('routine.id IN (:...ids)', { ids })
      .andWhere(`routine.userId = :userId`, { userId })
      .orderBy(`routine.order`, 'ASC')
      .addOrderBy(`routineStretchings.order`, 'ASC')
      .getMany();
  }
}
