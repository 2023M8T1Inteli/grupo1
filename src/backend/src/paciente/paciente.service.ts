import { Injectable } from '@nestjs/common';
import { CreatePacienteDto } from './dto/create-paciente.dto';
import { UpdatePacienteDto } from './dto/update-paciente.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { Paciente } from './entities/paciente.entity';

@Injectable()
export class PacienteService {
  constructor(private prisma: PrismaService) {}

  async createPaciente(data: Prisma.PacienteCreateInput): Promise<Paciente> {
    return this.prisma.paciente.create({
      data,
    });
  }

  async findOne(
    pacienteWhereUniqueInput: Prisma.PacienteWhereUniqueInput,
  ): Promise<Paciente | null> {
    return this.prisma.paciente.findUnique({
      where: pacienteWhereUniqueInput,
    });
  }

  async findAll(): Promise<Paciente[]> {
    return this.prisma.paciente.findMany();
  }

  update(id: number, updatePacienteDto: UpdatePacienteDto) {
    return `This action updates a #${id} paciente`;
  }

  remove(id: number) {
    return `This action removes a #${id} paciente`;
  }
}
