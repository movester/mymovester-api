import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StretchingEffectType } from '@app/common/enum';
import { StretchingEffect } from '@app/persistence/domain/stretching/entity/stretching-effect.entity';

@Injectable()
export class StretchingEffectRepository extends Repository<StretchingEffect> {
  constructor(dataSource: DataSource) {
    super(StretchingEffect, dataSource.createEntityManager());
  }

  async createStretchingEffect(request: {
    stretchingId: number;
    order: number;
    effect: StretchingEffectType;
  }): Promise<StretchingEffect> {
    const stretchingEffect: StretchingEffect = this.create({
      stretchingId: request.stretchingId,
      order: request.order,
      effect: request.effect,
    });

    await this.save(stretchingEffect);
    return stretchingEffect;
  }
}
