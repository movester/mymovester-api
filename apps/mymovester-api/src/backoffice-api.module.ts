import { Module } from '@nestjs/common';
import { BackofficeApiController } from './backoffice-api.controller';
import { BackofficeApiService } from './backoffice-api.service';

@Module({
  imports: [],
  controllers: [BackofficeApiController],
  providers: [BackofficeApiService],
})
export class BackofficeApiModule {}
