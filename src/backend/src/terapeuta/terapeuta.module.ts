import { Module } from '@nestjs/common';
import { TerapeutaService } from './terapeuta.service';
import { TerapeutaController } from './terapeuta.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TerapeutaController],
  providers: [TerapeutaService, PrismaService],
})
export class TerapeutaModule {}
