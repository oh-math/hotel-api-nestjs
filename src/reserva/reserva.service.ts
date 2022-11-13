import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Reserva } from '@prisma/client';
import moment from 'moment';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reserva: Prisma.ReservaCreateInput): Promise<Reserva> {
    this.verificaDatas(reserva);

    const quartoEncontrado = await this.prisma.quarto.findUnique({
      where: {
        id: reserva.Quarto.connect.id,
      },
    });

    if (!quartoEncontrado) {
      throw new HttpException(
        'O quarto está indisponivel',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.quarto.update({
      where: {
        id: reserva.Quarto.connect.id,
      },
      data: {
        disponibilidade: false,
      },
    });

    return await this.prisma.reserva.create({
      data: reserva,
    });
  }

  async findById(reserva: Prisma.ReservaWhereUniqueInput): Promise<Reserva> {
    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: reserva,
    });

    this.verificaReserva(reservaEncontrada);

    return reservaEncontrada;
  }

  async findMany(): Promise<Reserva[]> {
    const todasReservas = await this.prisma.reserva.findMany();

    if (todasReservas.length === 0) {
      throw new HttpException('Não existem reservas a serem exibidas', HttpStatus.NO_CONTENT);
    }
    return todasReservas;
  }

  async updateById(
    reserva: Prisma.ReservaWhereUniqueInput,
    reservaAtualizada: Prisma.ReservaUpdateInput,
  ): Promise<Reserva> {
    this.verificaDatas(reservaAtualizada);

    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: {
        id: reserva.id,
      },
    });

    if (!reservaEncontrada)
      return this.prisma.reserva.update({
        where: {
          id: reservaEncontrada.id,
        },
        data: reservaAtualizada,
      });
  }

  async deleteById(reserva: Prisma.ReservaWhereUniqueInput): Promise<Reserva> {
    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: reserva,
    });

    this.verificaReserva(reservaEncontrada);

    return await this.prisma.reserva.delete({
      where: {
        id: reservaEncontrada.id,
      },
    });
  }

  // ===================================== Métodos do negócio =====================================

  private verificaDatas(
    reserva: Prisma.ReservaCreateInput | Prisma.ReservaUpdateInput,
  ) {
    const dataAtual = moment(new Date());
    const dataReserva = moment(reserva.dataReserva.toString());

    if (dataReserva.isAfter(dataAtual.add(30, 'd'))) {
      throw new HttpException(
        'Não é possivel fazer uma reserva com mais de 30 dias de antecedência',
        HttpStatus.BAD_REQUEST,
      );
    } else if (dataReserva.isBefore(moment())) {
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

  private fazCheckinECheckout(
    reserva: Prisma.ReservaCreateInput | Prisma.ReservaUpdateInput,
  ) {
    let dataReserva = moment(<string>reserva.dataReserva);
    let estadiaNumero = <number>reserva.tempoEstadia;

    reserva.checkin = dataReserva.add(1, 'd').toDate();
    reserva.checkout = dataReserva.add(estadiaNumero, 'd').toDate();
  }

  private verificaReserva(reservaEncontrada: Reserva) {
    if (!reservaEncontrada)
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
  }
}
