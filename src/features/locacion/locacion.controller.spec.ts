import { Test, TestingModule } from '@nestjs/testing';
import { LocacionController } from './locacion.controller';
import { LocacionService } from './locacion.service';

describe('LocacionController', () => {
  let controller: LocacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocacionController],
      providers: [LocacionService],
    }).compile();

    controller = module.get<LocacionController>(LocacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
