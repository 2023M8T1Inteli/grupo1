import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TerapeutaService } from './terapeuta.service';
import { CreateTerapeutaDto } from './dto/create-terapeuta.dto';
import { UpdateTerapeutaDto } from './dto/update-terapeuta.dto';

@Controller('terapeuta')
export class TerapeutaController {
  constructor(private readonly terapeutaService: TerapeutaService) {}

  @Post()
  create(@Body() createTerapeutaDto: CreateTerapeutaDto) {
    return this.terapeutaService.createTerapeuta(createTerapeutaDto);
  }

  @Get()
  findAll() {
    return this.terapeutaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.terapeutaService.findOne({ id: Number(id) });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateterapeutaDto: UpdateTerapeutaDto,
  ) {
    return this.terapeutaService.update({
      id: +id,
      data: updateterapeutaDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.terapeutaService.remove(+id);
  }
}
