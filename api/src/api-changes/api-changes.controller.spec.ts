import { Test, TestingModule } from '@nestjs/testing';
import { ApiChangesController } from './api-changes.controller';
import { ApiChangesService } from './api-changes.service';

describe('ApiChangesController', () => {
  let controller: ApiChangesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiChangesController],
      providers: [
        {
          provide: ApiChangesService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApiChangesController>(ApiChangesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
