import {
  Controller,
  UseGuards,
  Post,
  Body,
  Delete,
  Version,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './response/login.response';
import { JwtAuthGuard } from './jwt-auth.guard';
import { KakaoLoginRequest } from './request/kakao-login.request';
import { UserDeco } from 'apps/mymovester-api/src/shared/decorator/user.decorator';
import { IUser } from 'apps/mymovester-api/src/user/user.interface';
import {
  DefaultResponse,
  IDefaultResponse,
} from '@app/common/response/default.response';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login/kakao')
  async kakaoLogin(@Body() body: KakaoLoginRequest): Promise<LoginResponse> {
    return this.authService.kakaoLogin({ body });
  }

  @Version('2')
  @Post('/login/kakao')
  async kakaoLoginV2(
    @Body() body: KakaoLoginRequest,
  ): Promise<IDefaultResponse> {
    return DefaultResponse.ok(await this.authService.kakaoLogin({ body }));
  }

  @Delete('/user')
  @UseGuards(JwtAuthGuard)
  async kakaoUnlink(@UserDeco() user: IUser): Promise<void> {
    return this.authService.kakaoUnlink(user.id);
  }

  @Version('2')
  @Delete('/user')
  @UseGuards(JwtAuthGuard)
  async kakaoUnlinkV2(@UserDeco() user: IUser): Promise<IDefaultResponse> {
    return DefaultResponse.ok(await this.authService.kakaoUnlink(user.id));
  }
}
