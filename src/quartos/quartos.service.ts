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

  async updateOne(quarto: Prisma.QuartoWhereUniqueInput): Promise<Quarto> {
    const numeroQuarto = await this.prisma.quarto.findUniqueOrThrow({
      where: quarto,
    });

    return this.prisma.quarto.update({
      where: {
        numeroDoQuarto: numeroQuarto.numeroDoQuarto,
      },
      data: {
        disponibilidade: true,
      },
    });
  }

  async deleteById(quarto: Prisma.QuartoWhereUniqueInput): Promise<Quarto> {
    const quartoID = await this.prisma.quarto.findUnique({
      where: quarto,
    });

    if (!quartoID) {
      throw new HttpException('Quarto não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.prisma.quarto.delete({
      where: {
        id: quartoID.id,
      },
    });
  }
}
