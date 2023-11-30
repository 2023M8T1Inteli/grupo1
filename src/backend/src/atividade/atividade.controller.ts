import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AtividadeService } from './atividade.service';
// import { UpdateAtividadeDto } from './dto/update-atividade.dto';
import { Prisma } from '@prisma/client';
import { CreateAtividadeDto } from './dto/create-atividade.dto';

@Controller('atividade')
export class AtividadeController {
  constructor(private readonly atividadeService: AtividadeService) {}

  @Post()
  create(@Body() createAtividadeDto: CreateAtividadeDto) {
    return this.atividadeService.createAtividade(createAtividadeDto);
  }

  @Get()
  findAll() {
    return this.atividadeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.atividadeService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateatividadeDto: Prisma.AtividadeUpdateInput,
  ) {
    return this.atividadeService.update({
      id: +id,
      data: updateatividadeDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.atividadeService.remove(+id);
  }
}
