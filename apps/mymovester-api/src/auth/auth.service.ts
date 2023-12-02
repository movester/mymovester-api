import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ILoginResponseDTO, LoginResponse } from './response/login.response';
import { UserService } from '../user/user.service';
import { User } from '@app/persistence/domain/user/entity/user.entity';

interface JwtToken {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  KAKAO_KEY = process.env.KAKAO_KEY || null;

  async kakaoLogin({ req }): Promise<LoginResponse> {
    // kakaoUid를 기반으로 가가입 유저 valid
    let user: User = await this.userService.getUserBySocialUid(
      req.user.socialUid,
    );
    if (user == null) {
      // 회원가입
      user = await this.userService.createUser(req.user);
    }
    const { accessToken, refreshToken } = await this.getJwtToken(user.email);

    const loginResponseParam: ILoginResponseDTO = {
      id: user.id,
      email: user.email,
      name: user.nickName,
      accessToken,
      refreshToken,
    };
    return new LoginResponse(loginResponseParam);
  }

  private async getAccessToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });
  }

  private async getRefreshToken(email: string): Promise<string> {
    const payload = { email };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });
  }

  async getJwtToken(email: string): Promise<JwtToken> {
    const accessToken = await this.getAccessToken(email);
    const refreshToken = await this.getRefreshToken(email);
    return { accessToken, refreshToken };
  }
}
