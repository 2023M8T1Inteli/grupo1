import { Module } from '@nestjs/common';
import { PacienteModule } from './paciente/paciente.module';
import { AtividadeModule } from './atividade/atividade.module';
import { TerapeutaModule } from './terapeuta/terapeuta.module';
import { PacienteController } from './paciente/paciente.controller';
import { PrismaService } from './prisma.service';
import { PacienteService } from './paciente/paciente.service';

@Module({
  imports: [PacienteModule, AtividadeModule, TerapeutaModule],
  controllers: [PacienteController],
  providers: [PacienteService, PrismaService],
})
export class AppModule {}
