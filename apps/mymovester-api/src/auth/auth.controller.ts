import { Controller, Param, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginResponse } from './response/login.response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/kakao')
  // @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(@Param('code') code: string): Promise<LoginResponse> {
    return this.authService.kakaoLogin(code);
  }
}
