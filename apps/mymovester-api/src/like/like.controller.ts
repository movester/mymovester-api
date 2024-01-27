import {
  Controller,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserDeco } from '../shared/decorator/user.decorator';
import { IUser } from '../user/user.interface';
import { DefaultResponse } from '@app/common/response/default.response';

@Controller('stretchings')
export class LikeController {
  constructor(private likeService: LikeService) {}

  @Post('/:id/like')
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
}
