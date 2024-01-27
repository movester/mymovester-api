import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocialType } from '@app/common';
import { Strategy } from 'passport-kakao';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get<string>('KAKAO_REST_API_KEY'),
      callbackURL: `${configService.get<string>(
        'API_URL',
      )}/auth/login/kakao/callback`,
      scope: ['account_email', 'profile_nickname'],
    });
  }

  async validate(accessToken, refreshToken, profile, done) {
    const profileJson = profile._json;
    try {
      console.log('kakao accessToken: ', accessToken);
      console.log('kakao refreshToken: ', refreshToken);
      console.log('kakao profile: ', profile);
      console.log('kakao profileJson: ', profileJson);
      return {
        socialUid: profile.id,
        name: profile.displayName,
        email: profile._json.kakao_account.email,
        socialType: SocialType.KAKAO,
      };
    } catch (err) {
      console.log('카카오 strategy 에러: ', err);
      done(err);
    }
  }
}
