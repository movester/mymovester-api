import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateRoutineRequest,
  DeleteRoutinesRequest,
} from 'apps/mymovester-api/src/routine/routine.request';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';

@Controller('/routines')
export class RoutineController {
  constructor(private routineService: RoutineService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async createRoutine(
    @UserDeco() user: IUser,
    @Body() request: CreateRoutineRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.createRoutine(user.id, request.title),
    );
  }

  @Get('/stretching')
  @UseGuards(JwtAuthGuard)
  async getRoutinesStretching(
    @UserDeco() user: IUser,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.getRoutinesStretching(user.id),
    );
  }

  @Get('/')
  @UseGuards(JwtAuthGuard)
  async getRoutines(@UserDeco() user: IUser): Promise<IDefaultResponse> {
    return DefaultResponse.ok(await this.routineService.getRoutines(user.id));
  }

  @Delete('/')
  @UseGuards(JwtAuthGuard)
  async deleteRoutines(
    @UserDeco() user: IUser,
    @Body() request: DeleteRoutinesRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.deleteRoutines(user.id, request),
    );
  }

  @Post('/:id/clone')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  async cloneRoutine(
    @UserDeco() user: IUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.cloneRoutine(user.id, id),
    );
  }
}
