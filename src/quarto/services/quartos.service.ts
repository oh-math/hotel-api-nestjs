import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateQuartoRequest } from '../dto/create.quartos.request';
import { QuartoResponse } from '../dto/quarto.response';

@Injectable()
export class QuartosService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(quarto: CreateQuartoRequest): Promise<QuartoResponse> {
    const novoQuarto = await this.prisma.quarto.create({
      data: {
        id: randomBytes(16),
        ...quarto,
      },
    });

    return plainToInstance(QuartoResponse, novoQuarto);
  }

  public async findById(id: string): Promise<QuartoResponse> {
    const quarto = await this.prisma.quarto.findUnique({
      where: {
        id: Buffer.from(id, 'hex'),
      },
    });

    if (!quarto) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return plainToInstance(QuartoResponse, quarto);
  }

  public async findMany(): Promise<QuartoResponse[]> {
    const quartos = await this.prisma.quarto.findMany();

    return plainToInstance(QuartoResponse, quartos)
  }

  public async updateOne(numeroQuarto: number): Promise<QuartoResponse> {
    const quarto = await this.prisma.quarto.update({
      where: {
        numeroDoQuarto: numeroQuarto,
      },
      data: {
        disponibilidade: true,
      },
    });

    return plainToInstance(QuartoResponse, quarto)
  }

  public async deleteById(id: string): Promise<Quarto> {
    const quartoID = await this.prisma.quarto.findUnique({
      where: {
        id: Buffer.from(id, 'hex'),
      },
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
