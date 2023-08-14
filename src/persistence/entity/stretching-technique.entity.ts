import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntityClass } from './base-entity.entity';
import { Stretching } from './stretching.entity';

@Entity('stretching_technique')
export class StretchingTechnique extends BaseEntityClass {
  @Column({
    name: 'stretching_id',
    type: 'int',
    comment: '스트레칭 id',
  })
  stretchingId: number;

  @ManyToOne(
    () => {
      return Stretching;
    },
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      nullable: false,
    },
  )
  @JoinColumn({
    name: 'stretching_id',
    referencedColumnName: 'id',
  })
  stretching: Stretching;

  @Column({
    name: 'order',
    type: 'int',
    comment: '순서',
  })
  order: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 50,
    default: '',
    comment: '설명',
  })
  description: string;
}
