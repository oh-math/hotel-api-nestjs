import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { randomBytes } from 'crypto';
import moment from 'moment';
import { PrismaService } from 'src/database/PrismaService';
import { CreateReservaRequest } from './dto/create.reserva.request';
import { ReservaResponse } from './dto/reserva.response';

@Injectable()
export class ReservaService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reserva: CreateReservaRequest): Promise<ReservaResponse> {
    this.verificaDatas(reserva);

    const quartoEncontrado = await this.prisma.quarto.findFirst({
      where: {
        numeroDoQuarto: reserva.quartoId,
      },
    });

    if (!quartoEncontrado.disponibilidade) {
      throw new HttpException(
        'O quarto está indisponivel',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.prisma.quarto.update({
      where: {
        numeroDoQuarto: quartoEncontrado.numeroDoQuarto,
      },
      data: {
        disponibilidade: false,
      },
    });

    const novaReserva = await this.prisma.reserva.create({
      data: {
        id: randomBytes(16),
        dataReserva: new Date(reserva.dataReserva),
        tempoEstadia: reserva.tempoEstadia,
        quartoId: reserva.quartoId,
        usuarioId: reserva.usuarioId,
        checkin: reserva.checkin,
        checkout: reserva.checkout
      },
    });

    return plainToInstance(ReservaResponse, novaReserva);
  }

  async findById(id: string): Promise<ReservaResponse> {
    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: {
        id: Buffer.from(id, 'hex')
      },
    });

    this.verificaReserva(reservaEncontrada);

    return plainToInstance(ReservaResponse, reservaEncontrada);
  }

  async findMany(): Promise<ReservaResponse[]> {
    const todasReservas = await this.prisma.reserva.findMany();

    if (todasReservas.length === 0) {
      throw new HttpException(
        'Não existem reservas a serem exibidas',
        HttpStatus.NO_CONTENT,
      );
    }
    return plainToInstance(ReservaResponse, todasReservas);
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

  async deleteById(id: string): Promise<ReservaResponse> {
    const reservaEncontrada = await this.prisma.reserva.findUnique({
      where: {
        id: Buffer.from(id, 'hex'),
      },
    });

    this.verificaReserva(reservaEncontrada);

    const reservaDeletada = await this.prisma.reserva.delete({
      where: {
        id: reservaEncontrada.id,
      },
    });

    return plainToInstance(ReservaResponse, reservaDeletada)
  }

  // ===================================== Métodos do negócio =====================================

  private verificaDatas(
    reserva: CreateReservaRequest | Prisma.ReservaUpdateInput,
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
    reserva: CreateReservaRequest | Prisma.ReservaUpdateInput,
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
