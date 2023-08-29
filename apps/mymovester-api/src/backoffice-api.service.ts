import { Injectable } from '@nestjs/common';

@Injectable()
export class BackofficeApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
