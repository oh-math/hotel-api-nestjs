import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { assert } from 'console';
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


    assert(data)
    return this.prisma.reserva.create({
      data,
    });
  }

  async deleteById(data: Prisma.ReservaWhereUniqueInput) {
    const reserva = await this.prisma.reserva.findFirst({
      where: {
        id: data.id,
      },
    });

    if (!reserva) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    await this.prisma.reserva.delete({
      where: {
        id: data.id,
      },
    });
  }

  async getById(
    reservaUnica: Prisma.ReservaWhereUniqueInput,
  ): Promise<Reserva> {
    const reserva = await this.prisma.reserva.findUnique({
      where: reservaUnica,
    });

    if (!reserva) {
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }

    return reserva;
  }

  // ===================================== metodos do negocio =====================================

  private verificaDatas(data: Prisma.ReservaCreateInput) {
    if (this.diasEntre(data.dataReserva) > 30) {
      throw new HttpException(
        'Não é possivel fazer uma reserva com mais de 30 dias de antecedência',
        HttpStatus.BAD_REQUEST,
      );
    } else if (this.diasEntre(data.dataReserva) < 0) {
      throw new HttpException(
        'Não é possivel fazer uma reserva no passado ou do dia atual',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (data.tempoEstadia > 3 || data.tempoEstadia <= 0) {
      throw new HttpException(
        'Não é possivel ter uma estadia superior a 3 dias ou inferior a 1 dia',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.fazCheckinECheckout(data);
  }

  private fazCheckinECheckout(data: Prisma.ReservaCreateInput) {
    let reservaData = new Date(data.dataReserva);

    data.checkin = new Date(reservaData.setDate(reservaData.getDate() + 1));
    data.checkout = new Date(
      reservaData.setDate(reservaData.getDate() + data.tempoEstadia),
    );
  }

  private verificaDisponibilidadeQuarto(quarto: Quarto) {
    if (!quarto.disponibilidade)
      throw new HttpException(
        'O quarto está indisponivel',
        HttpStatus.BAD_REQUEST,
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
