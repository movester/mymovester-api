import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { KakaoStrategy } from './kakao.strategy';
import { User } from '@app/persistence/domain/user/entity/user.entity';

@Module({
  imports: [
    JwtModule.register({
      global: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, KakaoStrategy, UserRepository],
})
export class AuthModule {}
