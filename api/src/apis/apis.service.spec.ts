import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ApisService } from './apis.service';
import { Api } from './schemas/api.schema';

describe('ApisService', () => {
  let service: ApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApisService,
        {
          provide: getModelToken(Api.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ApisService>(ApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
