import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { Reserva } from '@prisma/client';
import { ReservaCreateRequest } from './dto/create.reserva.request';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body() data: ReservaCreateRequest): Promise<Reserva> {
    const { tempoEstadia, reserva, idUsuario, idQuarto} = data;

    const dataReserva = new Date(reserva)
    return this.reservaService.create({
      tempoEstadia,
      dataReserva,
      Usuario: {
        connect: {
          id: idUsuario
        }
      },
      Quarto: {
        connect:{
          id: idQuarto
        }
      }
    });
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<void> {
     this.reservaService.deleteById({ id: Number(id) });
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Reserva> {
    return this.reservaService.getById({ id: Number(id) });
  }
}
