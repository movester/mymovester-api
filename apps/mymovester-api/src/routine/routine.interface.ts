import {
  GetRoutineListResponse,
  GetRoutineStretchingListResponse,
} from 'apps/mymovester-api/src/routine/routine-response';
import { DeleteRoutinesRequest } from 'apps/mymovester-api/src/routine/routine.request';

export interface IRoutineService {
  createRoutine(userId: number, title: string): Promise<null>;

  getRoutinesStretching(
    userId: number,
  ): Promise<GetRoutineStretchingListResponse[]>;

  getRoutines(userId: number): Promise<GetRoutineListResponse[]>;

  deleteRoutines(userId: number, { ids }: DeleteRoutinesRequest): Promise<null>;

  cloneRoutine(userId: number, id: number): Promise<null>;

  updateRoutine(userId: number, id: number, title: string): Promise<void>;

  createRoutineStretching(
    userId: number,
    routineIds: number[],
    stretchingId: number,
  ): Promise<void>;
}
