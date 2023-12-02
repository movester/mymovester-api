import { Controller, UseGuards, Get, Request, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginResponse } from './response/login.response';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { SocialType } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login/kakao')
  @UseGuards(AuthGuard('kakao'))
  async kakaoLogin(
    @Req() req: Request & IOAuthUser,
    @Res() res: Response,
  ): Promise<LoginResponse> {
    return this.authService.kakaoLogin({ req });
  }

  @Get('login/kakao/callback')
  @UseGuards(AuthGuard('kakao'))
  async kakaoCallback(@Req() req): Promise<LoginResponse> {
    return this.authService.kakaoLogin({ req });
  }

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
