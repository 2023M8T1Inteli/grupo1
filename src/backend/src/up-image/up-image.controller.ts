// import { Controller,Post, Body } from '@nestjs/common';


import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res } from "@nestjs/common";
import { upImage } from "./up-image.model";
import { upService } from "./up-image.service";
import { Request, Response } from "express";

@Controller('up-image')
export class UpImageController {
  constructor(private readonly upService: upService) {}

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
  async postBook(@Body() postData: upImage):Promise<upImage>{
       return this.upService.createBook(postData)
  }

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