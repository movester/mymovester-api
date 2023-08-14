import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityClass } from './base-entity.entity';
import { StretchingEffectType } from 'src/common/enum';
import { Stretching } from './stretching.entity';

@Entity('stretching_effect')
export class StretchingEffect extends BaseEntityClass {
  @Column({
    name: 'stretching_id',
    type: 'int',
    comment: '스트레칭 id',
  })
  stretchingId: number;

  @ManyToOne(() => Stretching, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
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
    name: 'effect',
    type: 'varchar',
    length: 50,
    comment: '효과',
  })
  effect: StretchingEffectType;
}
