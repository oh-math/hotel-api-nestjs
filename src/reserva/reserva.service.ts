import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Quarto, Reserva } from '@prisma/client';
import { retry } from 'rxjs';
import { PrismaService } from 'src/database/PrismaService';
import { ReservaCreateRequest } from './dto/create.reserva.request';
import { ReservaUpdateRequest } from './dto/update.reserva.request';

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

    if(!reservaEncontrada)

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

  private diasEntre(
    dataReserva: string | Date | Prisma.DateTimeFieldUpdateOperationsInput,
  ): number {
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
