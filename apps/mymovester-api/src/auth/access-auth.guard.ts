import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { IUser } from '../user/user.interface';

@Injectable()
export class AccessAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers.cookie
      ?.split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    if (!accessToken) {
      const nonAuth: IUser = {
        id: null,
        socialUuid: null,
        nickName: null,
      };
      request['user'] = nonAuth;
    } else {
      try {
        const payload = await this.jwtService.verifyAsync(accessToken, {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        });
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException(
          null,
          '사용자 정보가 유효하지 않습니다',
        );
      }
    }
    return true;
  }
}
