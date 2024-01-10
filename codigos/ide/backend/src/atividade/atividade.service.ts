/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';
import { Atividade, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import * as util from 'util'; // Certifique-se de importar 'util'
import { CreateAtividadeDto } from './dto/create-atividade.dto';
import * as fs from 'fs';

const execPromise = util.promisify(exec);

@Injectable()
export class AtividadeService {
  constructor(private prisma: PrismaService) {}

  async createAtividade(data: CreateAtividadeDto) {
    try {
      const { codigo, cenario, data: atividadeData, terapeutaId } = data;

      const caminhoScript = path.resolve(__dirname, '../../../../compilador/Compiler.py');
      const caminhoArquivo = path.resolve(__dirname, '../../../../compilador/codigo.txt');

      // Apaga o conteúdo do arquivo
      fs.writeFileSync(caminhoArquivo, '');

      // Escreve a nova string no arquivo
      fs.writeFileSync(caminhoArquivo, codigo);

      const comandoPython = `python ${caminhoScript} ${caminhoArquivo}`;

      const { stderr } = await execPromise(comandoPython);

      if (stderr) {
        console.error('Erro ao executar o comando:', stderr);
        throw new Error('Erro ao executar o comando Python');
      }

      await this.prisma.atividade.create({
        data: {
          codigo,
          cenario,
          data: atividadeData,
          terapeuta: {
            connect: { id: terapeutaId },
          },
        },
      });

      return { message: 'Atividade criada com sucesso' };
    } catch (error) {
      throw new BadRequestException(error.message || 'Erro ao criar atividade');
    }
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