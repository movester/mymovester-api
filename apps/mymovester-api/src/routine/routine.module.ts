import { Routine } from '@app/persistence/domain/routine/entity/routine.entity';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';
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
  ],
})
export class RoutineModule{}
