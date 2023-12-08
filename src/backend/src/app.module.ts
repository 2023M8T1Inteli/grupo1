import { Module } from '@nestjs/common';
import { PacienteModule } from './paciente/paciente.module';
import { AtividadeModule } from './atividade/atividade.module';
import { TerapeutaModule } from './terapeuta/terapeuta.module';
import { PacienteController } from './paciente/paciente.controller';
import { PrismaService } from './prisma.service';
import { PacienteService } from './paciente/paciente.service';
import { UpImageController } from './up-image/up-image.controller';
import { UpModule } from './up-image/up-image.module';
import { upService } from './up-image/up-image.service';


@Module({
  imports: [PacienteModule, AtividadeModule, TerapeutaModule, UpModule],
  controllers: [PacienteController, UpImageController],
  providers: [PacienteService, PrismaService, upService],
})
export class AppModule {}
