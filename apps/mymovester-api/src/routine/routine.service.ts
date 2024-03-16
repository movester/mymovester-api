import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { DefaultResponse } from '@app/common/response/default.response';
import { CreateRoutineRequest } from 'apps/mymovester-api/src/routine/routine.request';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';
import { GetRoutineListResponse, GetRoutineStretchingListResponse } from 'apps/mymovester-api/src/routine/routine-response';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineRepository)
    private routineRepository: RoutineRepository,
  ) {}

  async createRoutine(
    userId: number,
    title: string,
  ): Promise<DefaultResponse> {
    const [routines, count] = await this.routineRepository.findByUserIdAndCount(
      userId,
    );

    if (count > 5) {
      throw new BadRequestException('최대 5개 루틴까지 보유가 가능합니다.');
    }

    await this.routineRepository.saveRoutine(userId, title, routines.length === 0 ? 1 : routines[0].order + 1);

    return new DefaultResponse({
      isSuccess: true,
    });
  }

  async getRoutinesStretching(
    userId: number,
  ): Promise<GetRoutineStretchingListResponse[]> {
    const routines = await this.routineRepository.findByUserId(userId);
    return routines.map(routine => new GetRoutineStretchingListResponse(routine.id, routine.title, routine.order))
  }

  async getRoutines(
    userId: number,
  ): Promise<GetRoutineListResponse> {
    const routines = await this.routineRepository.findByUserId(userId);
    return routines.map(routine => new GetRoutineStretchingListResponse(routine.id, routine.title, routine.order))
  }
}
