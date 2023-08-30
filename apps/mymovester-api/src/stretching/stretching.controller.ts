import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingService } from './stretching.service';

@Controller('stretchings')
export class StretchingController {
  constructor(private stretchingService: StretchingService) {}

  @Get('/:id')
  getStretchingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StretchingDetailResponse> {
    return this.stretchingService.getStretchingById(id);
  }
}
