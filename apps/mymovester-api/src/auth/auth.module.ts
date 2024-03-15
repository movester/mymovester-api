import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { User } from '@app/persistence/domain/user/entity/user.entity';
import { KakaoService } from 'apps/mymovester-api/src/auth/kakao.service';
import { RoutineService } from 'apps/mymovester-api/src/routine/routine.service';
import { RoutineRepository } from '@app/persistence/domain/routine/repository/routine.repository';

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
    // Repository
    UserRepository,
    RoutineRepository
  ],
})

export class AuthModule {}
