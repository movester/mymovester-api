import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import { DefaultResponse } from '@app/common/response/default.response';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';
import { CreateRoutineRequest } from 'apps/mymovester-api/src/routine/request/create-routine.request';

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
    return this.routineService.createRoutine(user.id, request);
  }
}
