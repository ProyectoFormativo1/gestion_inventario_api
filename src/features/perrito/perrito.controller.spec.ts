import { Test, TestingModule } from '@nestjs/testing';
import { PerritoController } from './perrito.controller';
import { PerritoService } from './perrito.service';

describe('PerritoController', () => {
  let controller: PerritoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PerritoController],
      providers: [PerritoService],
    }).compile();

    controller = module.get<PerritoController>(PerritoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
