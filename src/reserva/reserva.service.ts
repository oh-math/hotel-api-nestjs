import { Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.ReservaCreateInput): Promise<Reserva> {
    this.verificaDatas(data);

    const quarto = await this.prisma.quarto.findFirst({
      where: {
        id: data.Quarto.connect.id,
      },
    });

    this.verificaDisponibilidadeQuarto(quarto);

    await this.prisma.quarto.update({
      where: {
        id: data.Quarto.connect.id,
      },
      data: {
        disponibilidade: false,
      },
    });

    return this.prisma.reserva.create({
      data,
    });
  }

  private verificaDatas(data: Prisma.ReservaCreateInput) {
    if (this.diasEntre(data.dataReserva) > 30) {
      throw new Error(
        'A reserva não pode ser feita com mais de 30 dias de antecedência',
      );
    } else if (this.diasEntre(data.dataReserva) < 0) {
      throw new Error(
        'Não é possivel fazer uma reserva no passado ou do dia atual',
      );
    }

    if (data.tempoEstadia > 3 || data.tempoEstadia <= 0) {
      throw new Error(
        'A estadia não pode ser maior que 3 dias ou menor ou igual a 0',
      );
    }

    this.fazCheckinECheckout(data);
  }

  private verificaDisponibilidadeQuarto(quarto: Quarto) {
    if (!quarto.disponibilidade) throw new Error('O quarto está indisponivel');
  }

  private fazCheckinECheckout(data: Prisma.ReservaCreateInput) {
    let reservaData = new Date(data.dataReserva);

    data.checkin = new Date(reservaData.setDate(reservaData.getDate() + 1));
    data.checkout = new Date(
      reservaData.setDate(reservaData.getDate() + data.tempoEstadia),
    );
  }

  private diasEntre(dataReserva: Date | string): number {
    const dataAtual = new Date();

    let contador;

    if (dataReserva >= dataAtual) {
      for (contador = 0; dataReserva >= dataAtual; contador++) {
        dataAtual.setDate(dataAtual.getDate() + 1);
      }
    } else if (dataReserva < dataAtual) {
      for (contador = 0; dataReserva < dataAtual; contador += -1) {
        dataAtual.setDate(dataAtual.getDate() - 1);
      }
    }
    return contador;
  }
}
