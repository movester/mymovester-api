import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ILoginResponseDTO, LoginResponse } from './response/login.response';
import { UserService } from '../user/user.service';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { KakaoService } from 'apps/mymovester-api/src/auth/kakao.service';
import { SocialType } from '@app/common';
import { JwtToken } from 'apps/mymovester-api/src/auth/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private kakaoService: KakaoService,
  ) {}

  async kakaoLogin({ body }): Promise<LoginResponse> {
    const {socialUid} = body;
    const userProperties = await this.kakaoService.getUserProperties(
      socialUid,
    );

    // kakaoUid를 기반으로 기가입 유저 valid
    let user: User = await this.userService.getUserBySocialUid(
      userProperties.id.toString()
    );

    if (user == null) {
      // 회원가입
      user = await this.userService.createUser({
        socialUid: userProperties.id.toString(),
        socialType: SocialType.KAKAO,
        name: userProperties.kakao_account.profile.nickname,
        email: userProperties.kakao_account.email,
      });
    }

    const { accessToken, refreshToken } = await this.getJwtToken(user.id, user.email);

    const loginResponseParam: ILoginResponseDTO = {
      id: user.id,
      email: user.email,
      name: user.nickName,
      accessToken,
      refreshToken,
    };

    return new LoginResponse(loginResponseParam);
  }

  async kakaoUnlink(id: number): Promise<void> {
    const user: User = await this.userService.getUserV2(id);
    await this.kakaoService.unlink(user.socialUid);
    await this.userService.deleteUser(user.id);
  }

  private async getAccessToken(id: number, email: string): Promise<string> {
    const payload = { id, email };
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

  async getJwtToken(id, email: string): Promise<JwtToken> {
    const accessToken = await this.getAccessToken(id, email);
    const refreshToken = await this.getRefreshToken(email);
    return { accessToken, refreshToken };
  }
}
