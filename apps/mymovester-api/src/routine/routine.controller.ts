import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import { DefaultResponse } from '@app/common/response/default.response';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';
import { CreateRoutineRequest } from 'apps/mymovester-api/src/routine/routine.request';
import { GetRoutineListResponse, GetRoutineStretchingListResponse } from 'apps/mymovester-api/src/routine/routine-response';

@Controller('/routines')
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Post('/')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createRoutine(
    @UserDeco() user: IUser,
    @Body() request: CreateRoutineRequest,
  ): Promise<DefaultResponse> {
    return this.routineService.createRoutine(user.id, request.title);
  }

  @Get('/stretching')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  getRoutinesStretching(
    @UserDeco() user: IUser,
  ): Promise<GetRoutineStretchingListResponse> {
    return this.routineService.getRoutinesStretching(user.id);
  }

  @Get('/')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  getRoutines(
    @UserDeco() user: IUser,
  ): Promise<GetRoutineListResponse> {
    return this.routineService.getRoutines(user.id);
  }
}
