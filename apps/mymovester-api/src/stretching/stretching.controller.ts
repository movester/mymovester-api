import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingService } from './stretching.service';
import { StretchingListResponse } from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { AccessAuthGuard } from '../auth/access-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';

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

  @Get('/')
  getStretchingList(
    @Query() query: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    return this.stretchingService.getStretchingList(query);
  }
}
