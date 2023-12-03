import { Controller, UseGuards, Get, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './response/login.response';
import { JwtAuthGuard } from './jwt-auth.guard';
import { SocialType } from '@app/common';
import { KakaoLoginRequest } from './request/kakao-login.request';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login/kakao')
  async kakaoLogin(
    @Body() body: KakaoLoginRequest,
  ): Promise<LoginResponse> {
    return this.authService.kakaoLogin({ body });
  }

  // @Get('login/kakao/callback')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoCallback(@Req() req): Promise<LoginResponse> {
  //   return this.authService.kakaoLogin({ req });
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

export interface IOAuthUser {
  user: {
    socialUid: string;
    socialType: SocialType;
    name: string;
    email: string;
  };
}
