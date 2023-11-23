/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';
import { Atividade, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) {}

  async createAtividade(data: CreateAtividadeDto) {
    
    const { codigo, cenario, data: atividadeData, terapeutaId } = data;

    const caminhoScript = path.resolve(__dirname, '../../compilador/analisadores/Compiler.py');
    
    exec(`python ${caminhoScript} ${codigo}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Erro ao chamar o script Python: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Erro no script Python: ${stderr}`);
        return;
      }
      console.log(`Saída do script Python: ${stdout}`);
    });

    return this.prisma.atividade.create({
      data: {
        codigo,
        cenario,
        data: atividadeData,
        terapeuta: {
          connect: { id: terapeutaId },
        },
        // pacientes: {
        //   where: {
        //     nome: {
        //       in: pacientes, // Supondo que os nomes dos pacientes são únicos
        //     },
        //   },
        // },
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
