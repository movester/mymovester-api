import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { StretchingImage } from '../entity/stretching-image.entity';

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
}
