import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import { DefaultResponse } from '@app/common/response/default.response';
import { GetUserStretchingLikeListRequest } from './request/get-user-stretching-like-request';
import { UserStretchingLikeListResponse } from '../stretching/response/user-stretching-like-list.response';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}
  @Post('/stretching/:id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createUserStretchingLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<DefaultResponse> {
    return this.likeService.createUserStretchingLike({
      userId: user.id,
      stretchingId: id,
    });
  }

  @Delete('/stretching/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteUserStretchingLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<DefaultResponse> {
    return this.likeService.deleteUserStretchingLike({
      userId: user.id,
      stretchingId: id,
    });
  }

  @Get('/stretching')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getUserStretchingLike(
    @Query() query: GetUserStretchingLikeListRequest,
    @UserDeco() user: IUser,
  ): Promise<UserStretchingLikeListResponse> {
    return this.likeService.getUserStretchingLikeList(query, user.id);
  }
}
