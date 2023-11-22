import { Injectable } from '@nestjs/common';
import { Atividade, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) {}

  async createAtividade(data: CreateAtividadeDto): Promise<Atividade> {
    return this.prisma.atividade.create({
      data: {
        codigo: data.codigo,
        cenario: data.cenario,
        data: data.data,
        terapeuta: {
          connect: { id: data.terapeutaId } // Certifique-se de ter o ID correto do terapeuta
        },
        pacientes: {
          create: data.pacientes // Certifique-se de ter os dados corretos dos pacientes
        }
      },
    });
  }
  

  async findOne(
    atividadeWhereUniqueInput: Prisma.AtividadeWhereUniqueInput,
  ): Promise<Atividade | null> {
    return this.prisma.atividade.findUnique({
      where: atividadeWhereUniqueInput,
    });
  }

  async findAll(): Promise<Atividade[]> {
    return this.prisma.atividade.findMany();
  }

  async update(params: {
    id: number;
    data: Prisma.AtividadeUpdateInput;
  }): Promise<Atividade> {
    const { id, data } = params;
    return this.prisma.atividade.update({
      data,
      where: { id },
    });
  }

  async remove(id: number): Promise<Atividade> {
    return this.prisma.atividade.delete({
      where: { id },
    });
  }
}
