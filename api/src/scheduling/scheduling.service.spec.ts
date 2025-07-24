import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ApiChangesService } from '../api-changes/api-changes.service';
import { ApisService } from '../apis/apis.service';
import { Api } from '../apis/schemas/api.schema';
import { SchedulingService } from './scheduling.service';

describe('SchedulingService', () => {
  let service: SchedulingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchedulingService,
        {
          provide: ApisService,
          useValue: {},
        },
        {
          provide: ApiChangesService,
          useValue: {},
        },
        {
          provide: getModelToken(Api.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SchedulingService>(SchedulingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
