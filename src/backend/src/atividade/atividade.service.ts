import { Injectable } from '@nestjs/common';
import { Atividade, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) {}

  async createatividade(data: Prisma.AtividadeCreateInput): Promise<Atividade> {
    return this.prisma.atividade.create({
      data,
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
