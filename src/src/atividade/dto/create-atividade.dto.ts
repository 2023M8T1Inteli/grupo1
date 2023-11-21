export class CreateAtividadeDto {
  id: number;
  codigo: string;
  cenario: string;
  terapeuta: string;
  pacientes?: string[];
}
