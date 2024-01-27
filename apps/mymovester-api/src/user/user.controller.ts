import { Controller, Get, UseGuards, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'apps/mymovester-api/src/auth/jwt-auth.guard';
import { UserDeco } from 'apps/mymovester-api/src/shared/decorator/user.decorator';
import { IUser } from 'apps/mymovester-api/src/user/user.interface';
import { UserResponse } from 'apps/mymovester-api/src/user/response/user.response';
import { UpdateUserRequest } from 'apps/mymovester-api/src/user/request/update-user.request';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(
    @UserDeco() user: IUser
  ): Promise<UserResponse> {
    return this.userService.getUser(user.id);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @UserDeco() user: IUser,
    @Body() body: UpdateUserRequest
  ): Promise<void> {
    return this.userService.updateUser(user.id, body);
  }
}
