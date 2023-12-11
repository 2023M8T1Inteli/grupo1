import { Prisma } from '@prisma/client';

export class upImage implements Prisma.upImageCreateInput{
    id: number; 
    usuario: string;
    foto: string;
}