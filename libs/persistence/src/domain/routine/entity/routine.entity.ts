import { BaseEntityClass } from "@app/persistence/domain/base-entity.entity";
import { RoutineItem } from "@app/persistence/domain/routine/entity/routine-item.entity";
import { User } from "@app/persistence/domain/user/entity/user.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";

@Entity('routine')
export class Routine extends BaseEntityClass {

  @Column({name: 'title',
    type: 'varchar',
    length: 255,
    default: '',comment: '제목',
  })
  title: string;

  @Column({
    name: 'order',
    type: 'int',
    default: 1,
    comment: '루틴 폴더 순서',
  })
  order: number;

  @Column({
    name: 'user_id',
    type: 'int',
    comment: '회원ID',
  })
  userId: number;

  @OneToOne(
    () => User,
    (user) => user,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  user: User;

  @OneToMany(
    () => RoutineItem,
    (routineItem) => routineItem.routine,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      cascade: ['insert'],
      nullable: true,
    },
  )
  routineItems: RoutineItem[];
}
