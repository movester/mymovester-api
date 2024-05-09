import { Routine } from '@app/persistence/domain/routine/entity/routine.entity';
import { RoutineStretchingRepository } from '@app/persistence/domain/routine/repository/routine-item.repository';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutineController } from 'apps/mymovester-api/src/routine/routine.controller';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';

@Module({
  imports: [TypeOrmModule.forFeature([Routine])],
  controllers: [RoutineController],
  providers: [
    RoutineService,
    RoutineRepository,
    RoutineStretchingRepository,
    {
      provide: 'IRoutineService',
      useClass: RoutineService,
    },
    RoutineRepository,
    UserRepository,
  ],
})
export class RoutineModule {}
