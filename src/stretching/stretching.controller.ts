import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StretchingService } from './stretching.service';
import { CreateStretchingRequest } from './request/create-stretching.request';
// import { StretchingStatusValidationPipe } from './pipe/stretching-status-validation.pipe';
import { Stretching } from 'src/persistence/entity/stretching.entity';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingListResponse } from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';

@Controller('stretchings')
export class StretchingController {
  private logger = new Logger('StretchingController');
  constructor(private stretchingService: StretchingService) {}

  @Get('/')
  getStretchingList(
    // TODO: query param valid
    @Query() query: GetStretchingListRequest,
  ): Promise<StretchingListResponse> {
    return this.stretchingService.getStretchingList(query);
  }

  @Post('/')
  @UsePipes(ValidationPipe)
  createStretching(
    @Body() createStretchingRequest: CreateStretchingRequest,
  ): Promise<Stretching> {
    this.logger.verbose(`POST 스트레칭 > ,
        Payload: ${JSON.stringify(createStretchingRequest)}}`);
    return this.stretchingService.createStretching(createStretchingRequest);
  }

  @Get('/:id')
  getStretchingById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StretchingDetailResponse> {
    return this.stretchingService.getStretchingById(id);
  }

  @Delete('/:id')
  deleteStretchingById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    this.logger.verbose(`DELETE 스트레칭 id: ${id}`);
    return this.stretchingService.deleteStretching(id);
  }

  // @Put('/:id/status')
  // updateStretchingStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', StretchingStatusValidationPipe) status: StretchingStatus,
  // ): Promise<Stretching> {
  //   return this.stretchingService.updateStretchingStatus(id, status);
  // }
}
