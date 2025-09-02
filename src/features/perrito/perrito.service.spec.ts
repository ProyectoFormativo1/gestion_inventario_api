import { Test, TestingModule } from '@nestjs/testing';
import { PerritoService } from './perrito.service';

describe('PerritoService', () => {
  let service: PerritoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PerritoService],
    }).compile();

    service = module.get<PerritoService>(PerritoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
