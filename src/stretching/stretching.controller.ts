import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StretchingService } from './stretching.service';
import { CreateStretchingRequest } from './request/create-stretching.request';
// import { StretchingStatusValidationPipe } from './pipe/stretching-status-validation.pipe';
import { Stretching } from 'src/persistence/entity/stretching.entity';

@Controller('stretchings')
export class StretchingController {
  private logger = new Logger('StretchingController');
  constructor(private stretchingService: StretchingService) {}

  // @Get('/')
  // getAllStretchings(): Promise<Stretching[]> {
  //   return this.stretchingService.getAllStretchings();
  // }

  @Post('/')
  @UsePipes(ValidationPipe)
  createStretching(
    @Body() createStretchingRequest: CreateStretchingRequest,
  ): Promise<Stretching> {
    this.logger.verbose(`POST 스트레칭 > ,
        Payload: ${JSON.stringify(createStretchingRequest)}}`);
    return this.stretchingService.createStretching(createStretchingRequest);
  }

  // @Get('/:id')
  // getStretchingById(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Stretching> {
  //   return this.stretchingService.getStretchingById(id);
  // }

  // @Delete('/:id')
  // deleteStretchingById(@Param('id', ParseIntPipe) id: number): Promise<void> {
  //   this.logger.verbose(`Someone trying to delete stretching id ${id}`);
  //   return this.stretchingService.deleteStretching(id);
  // }

  // @Put('/:id/status')
  // updateStretchingStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', StretchingStatusValidationPipe) status: StretchingStatus,
  // ): Promise<Stretching> {
  //   return this.stretchingService.updateStretchingStatus(id, status);
  // }
}
