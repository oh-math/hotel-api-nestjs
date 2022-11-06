import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { plainToClass } from 'class-transformer';
import { DateTime, Interval } from 'luxon';
import { interval } from 'rxjs';
import { PrismaService } from 'src/database/PrismaService';
import { CreateReservaRequest } from './dto/create.reserva.request';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    reserva: Prisma.ReservaCreateInput,
  ): Promise<CreateReservaRequest> {
    this.verificaDatas(reserva);

    const quartoEncontrado = await this.prisma.quarto.findUnique({
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

    const reservaCriada = await this.prisma.reserva.create({
      data: reserva,
    });

    return plainToClass(CreateReservaRequest, reservaCriada);
  }

  async findById(reserva: Prisma.ReservaWhereUniqueInput): Promise<Reserva> {
    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: reserva,
    });

    if (!reservaEncontrada) {
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }

    return reservaEncontrada;
  }

  async findMany(): Promise<Reserva[]> {
    const todasReservas = await this.prisma.reserva.findMany();

    if (todasReservas.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
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

    if (!reservaEncontrada) {
      throw new HttpException('Reserva não encontrada', HttpStatus.NOT_FOUND);
    }

    const reservaDeletada = await this.prisma.reserva.delete({
      where: {
        id: reservaEncontrada.id,
      },
    });

    return reservaDeletada;
  }

  // ===================================== metodos do negocio =====================================

  private verificaDatas(
    reserva: Prisma.ReservaCreateInput | Prisma.ReservaUpdateInput,
  ) {
    const dataAtual = DateTime.now();
    const reservaDataConvertida = new Date(reserva.dataReserva.toString());
    const intervalo = Interval.fromDateTimes(
      dataAtual,
      reservaDataConvertida,
    ).length('day');

    if (intervalo > 30) {
      throw new HttpException(
        'Não é possivel fazer uma reserva com mais de 30 dias de antecedência',
        HttpStatus.BAD_REQUEST,
      );
    } else if (isNaN(intervalo)) {
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
    let covertidoParaData = new Date(reserva.dataReserva.toString());
    let estadiaNumero = <number>reserva.tempoEstadia;

    reserva.checkin = new Date(
      covertidoParaData.setDate(covertidoParaData.getDate() + 1),
    );
    reserva.checkout = new Date(
      covertidoParaData.setDate(covertidoParaData.getDate() + estadiaNumero),
    );
  }

  private verificaDisponibilidadeQuarto(quarto: Quarto) {
    if (!quarto.disponibilidade)
      throw new HttpException(
        'O quarto está indisponivel',
        HttpStatus.BAD_REQUEST,
      );
  }
}
