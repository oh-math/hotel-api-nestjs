import { Injectable } from '@nestjs/common';
import { Prisma, Quarto } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class QuartosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.QuartoCreateInput): Promise<Quarto> {
    return this.prisma.quarto.create({
      data,
    });
  }

  async findOne(quartoUnico: Prisma.QuartoWhereUniqueInput): Promise<Quarto> {
    const quarto = await this.prisma.quarto.findUnique({
      where: quartoUnico,
    });

    if (!quarto) {
      throw new NotFoundError('Usuario não encontrado');
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
