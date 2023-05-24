import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

@Module({
  controllers: [AdminsController],
  // 종속성 주입 > controller 에 providers 내의 service 의존성 주입
  providers: [AdminsService]
})
export class AdminsModule {}
