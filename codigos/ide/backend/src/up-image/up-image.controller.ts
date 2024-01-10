// import { Controller,Post, Body } from '@nestjs/common';


import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors,  } from "@nestjs/common";
import { upImage } from "./up-image.model";
import { upService } from "./up-image.service";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { PrismaService } from "src/prisma.service";
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs/promises';

@Controller('up-image')
export class UpImageController {
  constructor(private readonly upService: upService, private readonly prisma: PrismaService) {}

  @Get()
  async getAllBook(@Req() request:Request, @Res() response:Response ):Promise<any>{
       const result =  await this.upService.getAllBook()
       return response.status(200).json({
            status: "Ok!",
            message: "Successfully fetch data!",
            result: result 
       })
  }

  // @Post()
  // @UseInterceptors(FileInterceptor('file', {
  //   storage: diskStorage({
  //     destination: './uploads',
  //     filename: (req, file, callback) => {
  //       const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
  //       return callback(null, `${randomName}${extname(file.originalname)}`);
  //     },
  //   }),
  // }))
  // async uploadFile(@UploadedFile() file: any) {
  //   if (!file || !file.buffer) {
  //     return { error: 'Arquivo inválido' };
  //   }

  //   console.log(file.originalname);
  //   const fileName = file.originalname;

  //   try {
  //     // Salvar a imagem no sistema de arquivos local
  //     const imagePath = `/caminho/absoluto/para/o/seu/diretorio/uploads/${fileName}`;
  //     await fs.writeFile(imagePath, file.buffer);

  //     // Salvar as informações no banco de dados usando Prisma
  //     const bufferString = file.buffer.toString('base64');
  //     const createdImage = await this.prisma.upImage.create({
  //       data: {
  //         usuario: fileName,
  //         foto: bufferString,
  //       },
  //     });

  //     return { filename: file.filename, imagePath };
  //   } catch (error) {
  //     return { error: 'Erro ao salvar o arquivo' };
  //   }
  // }
 
 
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: '../../compilador/imagens',
      filename: (req, file, callback) => {
        const fileName = '1.jpg';
        return callback(null, fileName);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: any) {
    if (!file || !file.buffer) {
      return { error: 'Arquivo inválido' };
    }

    console.log(file.originalname);
    const fileName = '1.jpg';

    try {
      // Salvar a imagem no sistema de arquivos local
      const imagePath = `./uploads/${fileName}`;
      await fs.writeFile(imagePath, file.buffer);

      // Salvar as informações no banco de dados usando Prisma
      const createdImage = await this.prisma.upImage.create({
        data: {
          usuario: fileName,
          foto: imagePath, // Salvar o caminho do arquivo no banco
        },
      });

      return { filename: file.filename, imagePath };
    } catch (error) {
      return { error: 'Erro ao salvar o arquivo ou enviar ao banco de dados' };
    }
  }
 
 
 
  // // @Post()
  // async postBook(@Body() postData: upImage):Promise<upImage>{
  //    return this.upService.createBook(postData)

  @Get(':id')
  async getBook(@Param('id') id:number):Promise<upImage | null>{
       return this.upService.getBook(id)
  }

  @Delete(':id')
  async deleteBook(@Param('id') id:number):Promise<upImage>{
       return this.upService.deleteBook(id)
  }

  @Put(':id')
  async updateBook(@Param('id') id: number,@Body() data: upImage): Promise<upImage> {
    return this.upService.updateBook(id,data);
  }

}