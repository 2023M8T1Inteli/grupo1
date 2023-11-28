import { Test, TestingModule } from '@nestjs/testing';
import { TerapeutaService } from './terapeuta.service';

describe('TerapeutaService', () => {
  let service: TerapeutaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerapeutaService],
    }).compile();

    service = module.get<TerapeutaService>(TerapeutaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
