import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';
import {
  GetRoutineListResponse,
  GetRoutineStretchingListResponse,
} from 'apps/mymovester-api/src/routine/routine-response';
import { isArrayEqual } from '@app/common';
import { DeleteRoutinesRequest, UpdateRoutineRequest } from './routine.request';

@Injectable()
export class RoutineService {
  constructor(
    @InjectRepository(RoutineRepository)
    private routineRepository: RoutineRepository,
  ) {}

  async createRoutine(userId: number, title: string): Promise<null> {
    const [routines, count] = await this.routineRepository.findByUserIdAndCount(
      userId,
    );

    if (count >= 5) {
      throw new BadRequestException('최대 5개 루틴까지 보유가 가능합니다.');
    }

    await this.routineRepository.saveRoutine(
      userId,
      title,
      routines.length === 0 ? 1 : routines[0].order + 1,
    );

    return null;
  }

  async getRoutinesStretching(
    userId: number,
  ): Promise<GetRoutineStretchingListResponse[]> {
    const routines = await this.routineRepository.findByUserId(userId);
    return routines.map(
      (routine) =>
        new GetRoutineStretchingListResponse(
          routine.id,
          routine.title,
          routine.order,
        ),
    );
  }

  async getRoutines(userId: number): Promise<GetRoutineListResponse[]> {
    const routines = await this.routineRepository.findByUserId(userId);
    return routines.map(
      (routine) => new GetRoutineListResponse(routine.title, [], 0),
    );
  }

  async deleteRoutines(
    userId: number,
    { ids }: DeleteRoutinesRequest,
  ): Promise<null> {
    const routines = await this.routineRepository.findByUserId(userId);

    if (routines.filter((routine) => routine.userId !== userId).length > 0) {
      throw new UnauthorizedException('루틴 삭제 권한이 없습니다.');
    }

    if (
      isArrayEqual(
        ids,
        routines.map((routine) => routine.id),
      )
    ) {
      throw new BadRequestException('루틴을 모두 삭제할 수 없습니다.');
    }

    await this.routineRepository.deleteRoutines(ids);

    return null;
  }

  async cloneRoutine(userId: number, id: number): Promise<null> {
    const [routines, count] = await this.routineRepository.findByUserIdAndCount(
      userId,
    );

    if (count >= 5) {
      throw new BadRequestException('최대 5개 루틴까지 보유가 가능합니다.');
    }

    const targetRoutine = routines.find((routine) => routine.id === id);

    if (!targetRoutine) {
      throw new BadRequestException('복제할 루틴이 존재하지 않습니다.');
    }

    // 루틴 폴더 복제
    await this.routineRepository.saveRoutine(
      userId,
      targetRoutine.title + '(사본)',
      routines.length === 0 ? 1 : routines[0].order + 1,
    );

    // TODO: 루틴 하위 스트레칭 복제
    return null;
  }

  async updateRoutine(
    userId: number,
    id: number,
    { title }: UpdateRoutineRequest,
  ): Promise<void> {
    const routine = await this.routineRepository.findByIdAndUserId(id, userId);

    if (!routine) {
      throw new BadRequestException('루틴 수정 권한이 없습니다.');
    }

    await this.routineRepository.updateRoutine(id, title);

    return;
  }
}
