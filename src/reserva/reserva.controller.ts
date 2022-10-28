import {
  Body,
  Controller,
  Delete,
  Get, Param,
  Post
} from '@nestjs/common';
import { Reserva } from '@prisma/client';
import { ReservaCreateRequest } from './dto/create.reserva.request';
import { ReservaService } from './reserva.service';

@Controller()
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post('reserva')
  async create(@Body() data: ReservaCreateRequest): Promise<Reserva> {
    const { tempoEstadia, reserva, idUsuario, idQuarto } = data;

    const dataReserva = new Date(reserva);
    return this.reservaService.create({
      tempoEstadia,
      dataReserva,
      Usuario: {
        connect: {
          id: idUsuario,
        },
      },
      Quarto: {
        connect: {
          id: idQuarto,
        },
      },
    });
  }

  @Delete('reserva/:id')
  async deleteById(@Param('id') id: number): Promise<Reserva> {
    return this.reservaService.deleteById({ id: id });
  }

  @Get('reserva/:id')
  async findById(@Param('id') id: number): Promise<Reserva> {
    return this.reservaService.findById({ id: id });
  }

  @Get('reserva/reservas')
  async findMany(): Promise<Reserva[]> {
    return this.reservaService.findMany();
  }
}
