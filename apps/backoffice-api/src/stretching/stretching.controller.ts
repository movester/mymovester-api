import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StretchingService } from './stretching.service';
import { CreateStretchingRequest } from './request/create-stretching.request';
import { StretchingDetailResponse } from './response/stretching-detail.response';
import { StretchingListResponse } from './response/stretching-list.response';
import { GetStretchingListRequest } from './request/get-stretching-list.request';
import { CreateStretchingResponse } from './response/create-stretching.response';
import { UpdateStretchingRequest } from './request/update-stretching.request';
import { UpdateStretchingResponse } from './response/update-stretching.response';

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
  ): Promise<CreateStretchingResponse> {
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

  // TODO: body valid
  @Put('/:id')
  updateStretching(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStretchingRequest: UpdateStretchingRequest,
  ): Promise<UpdateStretchingResponse> {
    this.logger.verbose(`PUT 스트레칭 id: ${id}`);
    return this.stretchingService.updateStretching(id, updateStretchingRequest);
  }
}
