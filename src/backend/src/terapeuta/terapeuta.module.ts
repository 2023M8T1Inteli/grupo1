import { Module } from '@nestjs/common';
import { TerapeutaService } from './terapeuta.service';
import { TerapeutaController } from './terapeuta.controller';

@Module({
  controllers: [TerapeutaController],
  providers: [TerapeutaService],
})
export class TerapeutaModule {}
