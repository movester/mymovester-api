import { DataSource, Like, Repository } from 'typeorm';
import { Stretching } from '../entity/stretching.entity';
import { Injectable } from '@nestjs/common';
import {
  StretchingListOrderFilter,
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from 'src/common/enum';
import { getSkipAndTake } from 'src/common/util';

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

  async findStretchingList(request: {
    page?: number;
    title?: string;
    mainCategory?: StretchingMainCategoryType;
    subCategory?: StretchingSubCategoryType;
    orderFilter?: StretchingListOrderFilter;
  }): Promise<[Stretching[], number]> {
    const { skip, take } = getSkipAndTake(request.page || 1);

    const query = this.createQueryBuilder('stretching')
      .where('stretching.title LIKE :title', { title: `%${request.title}%` })
      .skip(skip)
      .take(take);

    if (request.mainCategory) {
      query.andWhere('stretching.mainCategory = :mainCategory', {
        mainCategory: request.mainCategory,
      });
    }

    if (request.subCategory) {
      query.andWhere('stretching.subCategory = :subCategory', {
        subCategory: request.subCategory,
      });
    }

    if (request.orderFilter === StretchingListOrderFilter.POPULAR) {
      query.orderBy('stretching.views', 'DESC');
    } else {
      query.orderBy('stretching.createdAt', 'DESC');
    }

    return query.getManyAndCount();
  }
}
