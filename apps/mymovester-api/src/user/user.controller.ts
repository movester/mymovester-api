import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';
import {
  Body,
  Controller,
  Get,
  Inject,
  Put,
  UseGuards,
  Version,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/mymovester-api/src/auth/jwt-auth.guard';
import { UserDeco } from 'apps/mymovester-api/src/shared/decorator/user.decorator';
import { UpdateUserRequest } from 'apps/mymovester-api/src/user/request/update-user.request';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';
import { IUser } from 'apps/mymovester-api/src/user/user.interface';
import { UserService } from './user.service';

@ApiTags('회원')
@Controller('user')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '회원 조회' })
  async getUser(@UserDeco() user: IUser): Promise<UserResponse> {
    return this.userService.getUser(user.id);
  }

  @Version('2')
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserV2(@UserDeco() user: IUser): Promise<IDefaultResponse> {
    return DefaultResponse.ok(await this.userService.getUser(user.id));
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @UserDeco() user: IUser,
    @Body() body: UpdateUserRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(await this.userService.updateUser(user.id, body));
  }
}
