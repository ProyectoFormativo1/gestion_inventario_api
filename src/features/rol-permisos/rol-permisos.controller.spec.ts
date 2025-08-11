import { Test, TestingModule } from '@nestjs/testing';
import { RolPermisosController } from './rol-permisos.controller';
import { RolPermisosService } from './rol-permisos.service';

describe('RolPermisosController', () => {
  let controller: RolPermisosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolPermisosController],
      providers: [RolPermisosService],
    }).compile();

    controller = module.get<RolPermisosController>(RolPermisosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
