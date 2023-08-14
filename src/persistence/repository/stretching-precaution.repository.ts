import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StretchingPrecaution } from '../entity/stretching-precaution.entity';

@Injectable()
export class StretchingPrecautionRepository extends Repository<StretchingPrecaution> {
  constructor(dataSource: DataSource) {
    super(StretchingPrecaution, dataSource.createEntityManager());
  }

  async createStretchingPrecaution(request: {
    stretchingId: number;
    order: number;
    description: string;
  }): Promise<StretchingPrecaution> {
    const stretchingPrecaution: StretchingPrecaution = this.create({
      stretchingId: request.stretchingId,
      order: request.order,
      description: request.description,
    });

    await this.save(stretchingPrecaution);
    return stretchingPrecaution;
  }
}
