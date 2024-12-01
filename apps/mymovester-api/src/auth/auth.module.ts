import { RoutineStretchingRepository } from '@app/persistence/domain/routine/repository/routine-item.repository';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoService } from 'apps/mymovester-api/src/auth/kakao.service';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SlackService } from '@app/common';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    // Service
    AuthService,
    UserService,
    KakaoService,
    RoutineService,
    {
      provide: 'ISlackService',
      useClass: SlackService,
    },

    // Repository
    UserRepository,
    RoutineRepository,
    RoutineStretchingRepository,
    ConfigService,
  ],
})
export class AuthModule {}
