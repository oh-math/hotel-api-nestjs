import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateQuartoRequest } from './dto/create.quartos.request';
import { QuartoResponse } from './dto/quarto.response';

@Injectable()
export class QuartosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(quarto: CreateQuartoRequest): Promise<QuartoResponse> {
    const novoQuarto = await this.prisma.quarto.create({
      data: {
        id: randomBytes(16),
        ...quarto
      }
    });

    return plainToInstance(QuartoResponse, novoQuarto)
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
