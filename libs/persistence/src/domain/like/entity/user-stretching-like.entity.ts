import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntityClass } from '../../base-entity.entity';
import { Stretching } from '../../stretching/entity/stretching.entity';
import { User } from '../../user/entity/user.entity';

@Entity('user_stretching_like')
export class UserStretchingLike extends BaseEntityClass {
  @Column({
    name: 'user_id',
    type: 'int',
    comment: '유저 id',
  })
  userId: number;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User;

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
}
