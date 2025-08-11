import { Test, TestingModule } from '@nestjs/testing';
import { LocacionService } from './locacion.service';

describe('LocacionService', () => {
  let service: LocacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocacionService],
    }).compile();

    service = module.get<LocacionService>(LocacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
