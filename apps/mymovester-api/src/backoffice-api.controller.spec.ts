import { Test, TestingModule } from '@nestjs/testing';
import { BackofficeApiController } from './backoffice-api.controller';
import { BackofficeApiService } from './backoffice-api.service';

describe('BackofficeApiController', () => {
  let backofficeApiController: BackofficeApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BackofficeApiController],
      providers: [BackofficeApiService],
    }).compile();

    backofficeApiController = app.get<BackofficeApiController>(
      BackofficeApiController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(backofficeApiController.getHello()).toBe('Hello World!');
    });
  });
});
