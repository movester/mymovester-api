import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoutineStretching } from '../entity/routine-stretching.entity';

@Injectable()
export class RoutineStretchingRepository extends Repository<RoutineStretching> {
  constructor(private readonly dataSource: DataSource) {
    super(RoutineStretching, dataSource.createEntityManager());
  }

  async saveRoutineStretchings(
    request: {
      order: number;
      stretchingId: number;
      routineId: number;
    }[],
  ): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      await entityManager
        .createQueryBuilder()
        .insert()
        .into(RoutineStretching)
        .values(request)
        .execute();
    });
  }

  async findByRoutineId(routineId: number): Promise<RoutineStretching[]> {
    return await this.createQueryBuilder(`routineStretching`)
      .select()
      .where(`routineStretching.routineId = :routineId`, { routineId })
      .orderBy(`routineStretching.order`, 'ASC')
      .getMany();
  }
}
