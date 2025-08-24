import { Test, TestingModule } from '@nestjs/testing';
import { TipoMovimientoController } from './tipo-movimiento.controller';
import { TipoMovimientoService } from './tipo-movimiento.service';

describe('TipoMovimientoController', () => {
  let controller: TipoMovimientoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoMovimientoController],
      providers: [TipoMovimientoService],
    }).compile();

    controller = module.get<TipoMovimientoController>(TipoMovimientoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
