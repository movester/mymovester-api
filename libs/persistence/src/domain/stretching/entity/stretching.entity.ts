import { Length } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntityClass } from '../../base-entity.entity';
import { StretchingEffect } from './stretching-effect.entity';
import { StretchingImage } from './stretching-image.entity';
import { StretchingPrecaution } from './stretching-precaution.entity';
import { StretchingTechnique } from './stretching-technique.entity';
import {
  StretchingMainCategoryType,
  StretchingSubCategoryType,
} from '@app/common/enum';

@Entity('stretching')
export class Stretching extends BaseEntityClass {
  @Column({
    name: 'title',
    type: 'varchar',
    length: 50,
    default: '',
    comment: '제목',
  })
  @Length(1, 30)
  title: string;

  @Column({
    name: 'main_category',
    type: 'varchar',
    length: 50,
    comment: '대분류',
  })
  mainCategory: StretchingMainCategoryType;

  @Column({
    name: 'sub_category',
    type: 'varchar',
    length: 50,
    comment: '중분류',
  })
  subCategory: StretchingSubCategoryType;

  @Column({
    name: 'collect',
    type: 'int',
    comment: '횟수',
  })
  collect: number;

  @Column({
    name: 'set',
    type: 'int',
    comment: '세트',
  })
  set: number;

  @Column({
    name: 'views',
    type: 'int',
    default: 0,
    comment: '조회수',
  })
  views: number;

  @Column({
    name: 'adminId',
    type: 'int',
    nullable: true,
    comment: '작성자 id',
  })
  adminId: number;

  @Column({
    name: 'video_url',
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '참고 영상 링크',
  })
  videoUrl: string;

  @OneToMany(
    () => StretchingEffect,
    (stretchingEffect) => stretchingEffect.stretching,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  stretchingEffect: StretchingEffect[];

  @OneToMany(
    () => StretchingImage,
    (stretchingImage) => stretchingImage.stretching,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  stretchingImage: StretchingImage[];

  @OneToMany(
    () => StretchingPrecaution,
    (stretchingPrecaution) => stretchingPrecaution.stretching,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  stretchingPrecaution: StretchingPrecaution[];

  @OneToMany(
    () => StretchingTechnique,
    (stretchingTechnique) => stretchingTechnique.stretching,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  stretchingTechnique: StretchingTechnique[];

  public addView() {
    this.views++;
  }
}
