import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TerapeutaService } from './terapeuta.service';
import { CreateTerapeutaDto } from './dto/create-terapeuta.dto';
import { UpdateTerapeutaDto } from './dto/update-terapeuta.dto';

@Controller('terapeuta')
export class TerapeutaController {
  constructor(private readonly terapeutaService: TerapeutaService) {}

  @Post()
  create(@Body() createTerapeutaDto: CreateTerapeutaDto) {
    return this.terapeutaService.create(createTerapeutaDto);
  }

  @Get()
  findAll() {
    return this.terapeutaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terapeutaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTerapeutaDto: UpdateTerapeutaDto) {
    return this.terapeutaService.update(+id, updateTerapeutaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terapeutaService.remove(+id);
  }
}
