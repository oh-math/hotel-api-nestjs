import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class QuartosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.QuartoCreateInput): Promise<Quarto> {
    return this.prisma.quarto.create({
      data,
    });
  }

  async findById(quartoUnico: Prisma.QuartoWhereUniqueInput): Promise<Quarto> {
    const quarto = await this.prisma.quarto.findUnique({
      where: quartoUnico,
    });

    if (!quarto) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return quarto;
  }

  async findMany(): Promise<Quarto[]> {
    return this.prisma.quarto.findMany();
  }

  async updateOne(
    data: Prisma.QuartoWhereUniqueInput,
  ): Promise<Quarto> {
    return this.prisma.quarto.update({
      where: {
        id: data.id,
      },
      data: {
        disponibilidade: true,
      },
    });
  }
}
