import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingService } from './stretching.service';
import { StretchingListResponse } from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';

@Controller('stretchings')
export class StretchingController {
  constructor(private stretchingService: StretchingService) {}

  @Get('/:id')
  getStretchingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StretchingDetailResponse> {
    return this.stretchingService.getStretchingById(id);
  }

  @Get('/')
  getStretchingList(
    @Query() query: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    return this.stretchingService.getStretchingList(query);
  }
}
