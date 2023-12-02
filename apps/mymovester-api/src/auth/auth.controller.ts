import { Controller, Param, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './response/login.response';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/kakao')
  // @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Param('code') code: string): Promise<LoginResponse> {
    return this.authService.kakaoLogin(code);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
