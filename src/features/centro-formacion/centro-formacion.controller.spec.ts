import { Test, TestingModule } from '@nestjs/testing';
import { CentroFormacionController } from './centro-formacion.controller';
import { CentroFormacionService } from './centro-formacion.service';

describe('CentroFormacionController', () => {
  let controller: CentroFormacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentroFormacionController],
      providers: [CentroFormacionService],
    }).compile();

    controller = module.get<CentroFormacionController>(CentroFormacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
