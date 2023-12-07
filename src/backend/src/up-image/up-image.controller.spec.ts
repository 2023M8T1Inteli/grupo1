import { Test, TestingModule } from '@nestjs/testing';
import { UpImageController } from './up-image.controller';

describe('UpImageController', () => {
  let controller: UpImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpImageController],
    }).compile();

    controller = module.get<UpImageController>(UpImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
