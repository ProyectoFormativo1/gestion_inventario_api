import { Test, TestingModule } from '@nestjs/testing';
import { RolPermisosService } from './rol-permisos.service';

describe('RolPermisosService', () => {
  let service: RolPermisosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolPermisosService],
    }).compile();

    service = module.get<RolPermisosService>(RolPermisosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
