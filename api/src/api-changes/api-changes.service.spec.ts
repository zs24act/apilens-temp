import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiChangesService } from './api-changes.service';
import { ApiChange } from './schemas/api-change.schema';

describe('ApiChangesService', () => {
  let service: ApiChangesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiChangesService,
        {
          provide: getModelToken(ApiChange.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ApiChangesService>(ApiChangesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
