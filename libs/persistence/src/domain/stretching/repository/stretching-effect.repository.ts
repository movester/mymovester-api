import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findOneRepresentativeStretchingEffect(
    stretchingId: number,
  ): Promise<StretchingEffect> {
    return this.findOneOrFail({
      where: { stretchingId, order: 1 },
    }).catch(() => {
      throw new NotFoundException(
        `대표 스트레칭 효과가 존재하지 않습니다. id: ${stretchingId}`,
      );
    });
  }
}
