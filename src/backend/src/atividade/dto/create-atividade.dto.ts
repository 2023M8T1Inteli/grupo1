import { Terapeuta } from '@prisma/client';

export class CreateAtividadeDto {
  codigo: string;
  cenario: string;
  terapeuta: Terapeuta;
  pacientes?: string[];
}
