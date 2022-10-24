import { Injectable, NotImplementedException } from '@nestjs/common';
import { Prisma, Reserva } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ReservaCreateInput): Promise<Reserva> {
    if (this.diasEntre(data.dataReserva) > 30) {
      throw new Error(
        `A reserva não pode ser feita com mais de 30 dias de antecedência`,
      );
    }

    return this.prisma.reserva.create({
      data,
    });
  }

  diasEntre(dataReserva: Date | string): number {
    const dataAtual = new Date();

    let contador;

    for (contador = 0; dataAtual <= dataReserva; contador++) {
      dataAtual.setDate(dataAtual.getDate() + 1);
    }
    return contador;
  }
}
