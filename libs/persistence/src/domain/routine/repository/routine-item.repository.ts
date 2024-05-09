import { Routine } from '@app/persistence/domain/routine/entity/routine.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { RoutineStretching } from '../entity/routine-stretching.entity';

@Injectable()
export class RoutineStretchingRepository extends Repository<RoutineStretching> {
  constructor(private readonly dataSource: DataSource) {
    super(Routine, dataSource.createEntityManager());
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
}
