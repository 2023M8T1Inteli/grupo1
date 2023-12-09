// import { Controller,Post, Body } from '@nestjs/common';


import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UploadedFile, UseInterceptors,  } from "@nestjs/common";
import { upImage } from "./up-image.model";
import { upService } from "./up-image.service";
import { Request, Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { PrismaService } from "src/prisma.service";

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

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file:any){
    console.log(file.originalname)
    var fileName = file.originalname;
    var buffer = file.buffer.toString('base64');;

    const createdImage = await this.prisma.upImage.create({
      data: {
        usuario: fileName,
        foto: buffer,
      },
    });
  }

  // @Post()
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