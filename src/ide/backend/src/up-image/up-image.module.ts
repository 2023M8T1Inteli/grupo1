import { Module } from "@nestjs/common";
import { UpImageController } from "./up-image.controller";
import { upService } from "./up-image.service";
import { PrismaService } from "../prisma.service";


@Module({
     controllers: [UpImageController],
     providers: [upService, PrismaService]
})
export class UpModule{}