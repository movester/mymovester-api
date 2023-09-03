import { DataSource, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { StretchingImage } from '@app/persistence/domain/stretching/entity/stretching-image.entity';

@Injectable()
export class StretchingImageRepository extends Repository<StretchingImage> {
  constructor(dataSource: DataSource) {
    super(StretchingImage, dataSource.createEntityManager());
  }

  async createStretchingImage(request: {
    stretchingId: number;
    order: number;
    url: string;
  }): Promise<StretchingImage> {
    const stretchingImage: StretchingImage = this.create({
      stretchingId: request.stretchingId,
      order: request.order,
      url: request.url,
    });

    await this.save(stretchingImage);
    return stretchingImage;
  }

  async findOneRepresentativeStretchingImage(
    stretchingId: number,
  ): Promise<StretchingImage> {
    return this.findOneOrFail({
      where: { stretchingId, order: 1 },
    }).catch(() => {
      throw new NotFoundException(
        `대표 스트레칭 이미지가 존재하지 않습니다. id: ${stretchingId}`,
      );
    });
  }
}
