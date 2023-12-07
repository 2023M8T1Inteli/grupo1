import { Controller,Get } from '@nestjs/common';


@Controller('up-image')
export class UpImageController {
  @Get()
  getHello(): string {
    return 'Olá, mundo!';
  }
}