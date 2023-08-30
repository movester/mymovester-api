import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StretchingTechnique } from '@app/persistence/domain/stretching/entity/stretching-technique.entity';

@Injectable()
export class StretchingTechniqueRepository extends Repository<StretchingTechnique> {
  constructor(dataSource: DataSource) {
    super(StretchingTechnique, dataSource.createEntityManager());
  }

  async createStretchingTechnique(request: {
    stretchingId: number;
    order: number;
    description: string;
  }): Promise<StretchingTechnique> {
    const stretchingTechnique: StretchingTechnique = this.create({
      stretchingId: request.stretchingId,
      order: request.order,
      description: request.description,
    });

    await this.save(stretchingTechnique);
    return stretchingTechnique;
  }
}
