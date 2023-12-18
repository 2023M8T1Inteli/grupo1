import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Terapeuta } from '@prisma/client';

@Injectable()
export class TerapeutaService {
  constructor(private prisma: PrismaService) {}

  async createTerapeuta(data: Prisma.TerapeutaCreateInput): Promise<Terapeuta> {
    return this.prisma.terapeuta.create({
      data,
    });
  }

  async findOne(
    terapeutaWhereUniqueInput: Prisma.TerapeutaWhereUniqueInput,
  ): Promise<Terapeuta | null> {
    return this.prisma.terapeuta.findUnique({
      where: terapeutaWhereUniqueInput,
    });
  }

  async findAll(): Promise<Terapeuta[]> {
    return this.prisma.terapeuta.findMany();
  }

  async update(params: {
    id: number;
    data: Prisma.TerapeutaUpdateInput;
  }): Promise<Terapeuta> {
    const { id, data } = params;
    return this.prisma.terapeuta.update({
      data,
      where: { id },
    });
  }

  async remove(id: number): Promise<Terapeuta> {
    return this.prisma.terapeuta.delete({
      where: { id },
    });
  }
}
