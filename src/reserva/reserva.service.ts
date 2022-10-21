import { Injectable } from '@nestjs/common';
import { Prisma, Reserva } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ReservaCreateInput): Promise<Reserva> {
    return this.prisma.reserva.create({
      data,
    });
  }
}
