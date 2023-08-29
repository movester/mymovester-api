import { Injectable } from '@nestjs/common';

@Injectable()
export class PersistenceService {
  getHello(): void {
    console.log('======PersistenceService lib test!=====');
  }
}
