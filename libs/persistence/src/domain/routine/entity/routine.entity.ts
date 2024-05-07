import { BaseEntityClass } from '@app/persistence/domain/base-entity.entity';
import { RoutineStretching } from '@app/persistence/domain/routine/entity/routine-stretching.entity';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { Column, DeleteDateColumn, Entity, OneToMany, OneToOne } from 'typeorm';

@Entity('routine')
export class Routine extends BaseEntityClass {
  map(arg0: (routine: any) => any): number[] {
    throw new Error('Method not implemented.');
  }
  @Column({
    name: 'title',
    type: 'varchar',
    length: 255,
    default: '',
    comment: '제목',
  })
  title: string;

  @Column({
    name: 'order',
    type: 'int',
    default: 1,
    comment: '루틴 폴더 순서',
  })
  order: number;

  @DeleteDateColumn()
  deletedAt!: Date | null;

  @Column({
    name: 'user_id',
    type: 'int',
    comment: '회원ID',
  })
  userId: number;

  @OneToOne(() => User, (user) => user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: ['insert'],
    nullable: true,
  })
  user: User;

  @OneToMany(
    () => RoutineStretching,
    (routineStretching) => routineStretching.routine,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  routineStretchings: RoutineStretching[];
}
