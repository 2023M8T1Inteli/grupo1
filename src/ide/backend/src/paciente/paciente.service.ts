import { Injectable } from '@nestjs/common';
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

  async update(params: {
    id: number;
    data: Prisma.PacienteUpdateInput;
  }): Promise<Paciente> {
    const { id, data } = params;
    return this.prisma.paciente.update({
      data,
      where: { id },
    });
  }

  async remove(id: number): Promise<Paciente> {
    return this.prisma.paciente.delete({
      where: { id },
    });
  }
}
