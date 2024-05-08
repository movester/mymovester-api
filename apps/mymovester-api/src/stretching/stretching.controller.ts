import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';
import {
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { IStretchingService } from 'apps/mymovester-api/src/stretching/stretching.interface';
import { AccessAuthGuard } from '../auth/access-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingListResponse } from './response/stretching-list.response';

@Controller('stretchings')
export class StretchingController {
  constructor(
    @Inject('IStretchingService')
    private readonly stretchingService: IStretchingService,
  ) {}

  @Get('/:id')
  @UseGuards(AccessAuthGuard)
  getStretchingById(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<StretchingDetailResponse> {
    return this.stretchingService.getStretchingById(id, user.id);
  }

  @Version('2')
  @Get('/:id')
  @UseGuards(AccessAuthGuard)
  async getStretchingByIdV2(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.stretchingService.getStretchingById(id, user.id),
    );
  }

  @Get('/')
  getStretchingList(
    @Query() query: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    return this.stretchingService.getStretchingList(query);
  }

  @Version('2')
  @Get('/')
  async getStretchingListV2(
    @Query() query: GetStretchingListRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.stretchingService.getStretchingList(query),
    );
  }
}
