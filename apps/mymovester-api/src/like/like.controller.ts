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
  Version,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';
import { GetUserStretchingLikeListRequest } from './request/get-user-stretching-like-request';
import { UserStretchingLikeListResponse } from '../stretching/response/user-stretching-like-list.response';

@Controller('like')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('/stretchings/:id')
  @HttpCode(201)
  @UseGuards(JwtAuthGuard)
  createUserStretchingLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<object> {
    return this.likeService.createUserStretchingLike({
      userId: user.id,
      stretchingId: id,
    });
  }

  @Version('2')
  @Post('/stretchings/:id')
  @UseGuards(JwtAuthGuard)
  async createUserStretchingLikeV2(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.likeService.createUserStretchingLikeV2({
        userId: user.id,
        stretchingId: id,
      }),
    );
  }

  @Delete('/stretchings/:id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  deleteUserStretchingLike(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<object> {
    return this.likeService.deleteUserStretchingLike({
      userId: user.id,
      stretchingId: id,
    });
  }

  @Version('2')
  @Delete('/stretchings/:id')
  @UseGuards(JwtAuthGuard)
  async deleteUserStretchingLikeV2(
    @Param('id', ParseIntPipe) id: number,
    @UserDeco() user: IUser,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.likeService.deleteUserStretchingLikeV2({
        userId: user.id,
        stretchingId: id,
      }),
    );
  }

  @Get('/stretchings')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  getUserStretchingLike(
    @Query() query: GetUserStretchingLikeListRequest,
    @UserDeco() user: IUser,
  ): Promise<UserStretchingLikeListResponse> {
    return this.likeService.getUserStretchingLikeList(query, user.id);
  }

  @Version('2')
  @Get('/stretchings')
  @UseGuards(JwtAuthGuard)
  async getUserStretchingLikeV2(
    @Query() query: GetUserStretchingLikeListRequest,
    @UserDeco() user: IUser,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(
      await this.likeService.getUserStretchingLikeList(query, user.id),
    );
  }
}
