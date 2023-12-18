import { Test, TestingModule } from '@nestjs/testing';
import { TerapeutaController } from './terapeuta.controller';
import { TerapeutaService } from './terapeuta.service';

describe('TerapeutaController', () => {
  let controller: TerapeutaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TerapeutaController],
      providers: [TerapeutaService],
    }).compile();

    controller = module.get<TerapeutaController>(TerapeutaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
