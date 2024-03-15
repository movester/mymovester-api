import { BaseEntityClass } from "@app/persistence/domain/base-entity.entity";
import { Routine } from "@app/persistence/domain/routine/entity/routine.entity";
import { Stretching } from "@app/persistence/domain/stretching/entity/stretching.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";


@Entity('routine_item')
export class RoutineItem extends BaseEntityClass {

  @Column({
    name: 'order',
    type: 'int',
    default: 1,
    comment: '스트레칭 순서',
  })
  order: number;

  @ManyToOne(() => Routine, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'routine_id',
    referencedColumnName: 'id',
  })
  routine: Routine;

  @Column({
    name: 'stretching_id',
    type: 'int',
    comment: '스트레칭 ID',
  })
  stretchingId: number;

  @OneToOne(
    () => Stretching,
    (stretching) => stretching,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  stretching: Stretching;
}