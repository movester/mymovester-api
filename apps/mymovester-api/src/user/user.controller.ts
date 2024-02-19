import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'apps/mymovester-api/src/auth/jwt-auth.guard';
import { UserDeco } from 'apps/mymovester-api/src/shared/decorator/user.decorator';
import { IUser } from 'apps/mymovester-api/src/user/user.interface';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('회원')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: '회원 조회'})
  async getUser(
    @UserDeco() user: IUser
  ): Promise<UserResponse> {
    return this.userService.getUser(user.id);
  }
}
