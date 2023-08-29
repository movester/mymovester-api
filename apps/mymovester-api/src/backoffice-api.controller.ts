import { Controller, Get } from '@nestjs/common';
import { BackofficeApiService } from './backoffice-api.service';

@Controller()
export class BackofficeApiController {
  constructor(private readonly backofficeApiService: BackofficeApiService) {}

  @Get()
  getHello(): string {
    return this.backofficeApiService.getHello();
  }
}
