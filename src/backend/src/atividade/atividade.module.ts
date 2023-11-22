import { Module } from '@nestjs/common';
import { AtividadeService } from './atividade.service';
import { AtividadeController } from './atividade.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AtividadeController],
  providers: [AtividadeService, PrismaService],
})
export class AtividadeModule {}
