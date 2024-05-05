import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  Version,
} from '@nestjs/common';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingService } from './stretching.service';
import { StretchingListResponse } from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { AccessAuthGuard } from '../auth/access-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';

@Controller('stretchings')
export class StretchingController {
  constructor(private stretchingService: StretchingService) {}

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
