import { DataSource, Repository } from 'typeorm';
import { Stretching } from '../entity/stretching.entity';
import { Injectable } from '@nestjs/common';
import {
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from 'src/common/enum';

@Injectable()
export class StretchingRepository extends Repository<Stretching> {
  constructor(dataSource: DataSource) {
    super(Stretching, dataSource.createEntityManager());
  }

  async createStretching(request: {
    title: string;
    mainCategory: StretchingMainCategoryType;
    subCategory: StretchingSubCategoryType;
    collect: number;
    set: number;
    adminId: number;
    videoUrl: string;
  }): Promise<Stretching> {
    const stretching: Stretching = this.create({
      title: request.title,
      mainCategory: request.mainCategory,
      subCategory: request.subCategory,
      collect: request.collect,
      set: request.set,
      adminId: request.adminId,
      videoUrl: request.videoUrl,
    });

    await this.save(stretching);
    return stretching;
  }
}
