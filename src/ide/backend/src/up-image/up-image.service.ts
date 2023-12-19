import { PrismaService } from "../prisma.service";
import { upImage } from "./up-image.model";
import { Injectable } from "@nestjs/common";


@Injectable()
export class upService{

     constructor(private prisma: PrismaService){}

     async getAllBook(): Promise<upImage[]>{
          return this.prisma.upImage.findMany()
     }

     async getBook(id:number): Promise<upImage | null>{
          return this.prisma.upImage.findUnique({where: {id:Number(id)}})
     }

     async createBook(data: upImage): Promise<upImage>{
          return this.prisma.upImage.create({
               data,
          })
     }

     async updateBook(id:number,data:upImage):Promise<upImage>{
          return this.prisma.upImage.update({
               where: {id:Number(id)},
               data:{ usuario: data.usuario, foto:data.foto }
          })
     }

     async deleteBook(id:number):Promise<upImage>{
          return this.prisma.upImage.delete({
               where:{id: Number(id)}
          })
     }
}