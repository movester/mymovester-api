import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException(null, '사용자 정보가 유효하지 않습니다');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(null, '사용자 정보가 유효하지 않습니다');
    }

    return true;
  }

  private extractTokenFromHeader(
    request: Request & { headers: { authorization: string } },
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
