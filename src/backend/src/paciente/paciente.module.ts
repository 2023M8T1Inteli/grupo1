import { Module } from '@nestjs/common';
import { PacienteService } from './paciente.service';
import { PacienteController } from './paciente.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PacienteController],
  providers: [PrismaService, PacienteService],
  exports: [PacienteService],
})
export class PacienteModule {}
