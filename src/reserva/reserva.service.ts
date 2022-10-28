import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reserva: Prisma.ReservaCreateInput): Promise<Reserva> {
    this.verificaDatas(reserva);

    const quartoEncontrado = await this.prisma.quarto.findFirst({
      where: {
        id: reserva.Quarto.connect.id,
      },
    });

    this.verificaDisponibilidadeQuarto(quartoEncontrado);

    await this.prisma.quarto.update({
      where: {
        id: reserva.Quarto.connect.id,
      },
      data: {
        disponibilidade: false,
      },
    });

    return this.prisma.reserva.create({
      data: reserva,
    });
  }

  // --------------------------------------------------------------------------

  async deleteById(reserva: Prisma.ReservaWhereUniqueInput): Promise<Reserva> {
    const reservaID = await this.prisma.reserva.findUnique({
      where: reserva,
    });

    if (!reservaID) {
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }

    const reservaDeletada = await this.prisma.reserva.delete({
      where: {
        id: reservaID.id,
      },
    });

    return reservaDeletada;
  }

  // --------------------------------------------------------------------------

  async findById(reserva: Prisma.ReservaWhereUniqueInput): Promise<Reserva> {
    const reservaUnica = await this.prisma.reserva.findUnique({
      where: reserva,
    });

    if (!reservaUnica) {
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }

    return reservaUnica;
  }

  // --------------------------------------------------------------------------

  async findMany(): Promise<Reserva[]> {
    const todasReservas = await this.prisma.reserva.findMany();
    if (todasReservas.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }
    return todasReservas;
  }

  // ===================================== metodos do negocio =====================================

  private verificaDatas(reserva: Prisma.ReservaCreateInput) {
    if (this.diasEntre(reserva.dataReserva) > 30) {
      throw new HttpException(
        'Não é possivel fazer uma reserva com mais de 30 dias de antecedência',
        HttpStatus.BAD_REQUEST,
      );
    } else if (this.diasEntre(reserva.dataReserva) < 0) {
      throw new HttpException(
        'Não é possivel fazer uma reserva no passado ou do dia atual',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (reserva.tempoEstadia > 3 || reserva.tempoEstadia <= 0) {
      throw new HttpException(
        'Não é possivel ter uma estadia superior a 3 dias ou inferior a 1 dia',
        HttpStatus.BAD_REQUEST,
      );
    }

    this.fazCheckinECheckout(reserva);
  }

  // --------------------------------------------------------------------------

  private fazCheckinECheckout(reserva: Prisma.ReservaCreateInput) {
    let covertidoParaData = new Date(reserva.dataReserva);

    reserva.checkin = new Date(
      covertidoParaData.setDate(covertidoParaData.getDate() + 1),
    );
    reserva.checkout = new Date(
      covertidoParaData.setDate(
        covertidoParaData.getDate() + reserva.tempoEstadia,
      ),
    );
  }

  private verificaDisponibilidadeQuarto(quarto: Quarto) {
    if (!quarto.disponibilidade)
      throw new HttpException(
        'O quarto está indisponivel',
        HttpStatus.BAD_REQUEST,
      );
  }

  // --------------------------------------------------------------------------

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
