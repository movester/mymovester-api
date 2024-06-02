import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IRoutineService } from 'apps/mymovester-api/src/routine/routine.interface';
import {
  CreateRoutineRequest,
  CreateRoutineStretchingRequest,
  DeleteRoutinesRequest,
  UpdateRoutineRequest,
} from 'apps/mymovester-api/src/routine/routine.request';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';

@Controller('/routines')
export class RoutineController {
  constructor(
    @Inject('IRoutineService')
    private readonly routineService: IRoutineService,
  ) {}

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
  @UseGuards(JwtAuthGuard)
  async cloneRoutine(
    @UserDeco() user: IUser,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.cloneRoutine(user.id, id),
    );
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  async updateRoutine(
    @UserDeco() user: IUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() request: UpdateRoutineRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.updateRoutine(user.id, id, request.title),
    );
  }

  @Post('/stretchings')
  @UseGuards(JwtAuthGuard)
  async createRoutineStretching(
    @UserDeco() user: IUser,
    @Body() request: CreateRoutineStretchingRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.createRoutineStretching(
        user.id,
        request.routineIds,
        request.stretchingId,
      ),
    );
  }

  @Post('/:id/stretchings/:stretchingId/clone')
  @UseGuards(JwtAuthGuard)
  async cloneRoutineStretching(
    @UserDeco() user: IUser,
    @Param('id', ParseIntPipe) id: number,
    @Param('stretchingId', ParseIntPipe) stretchingId: number,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.routineService.cloneRoutineStretching(
        user.id,
        id,
        stretchingId,
      ),
    );
  }
}
