import { Body, Controller, Post } from '@nestjs/common';
import { Reserva } from '@prisma/client';
import { ReservaRequest } from './dto/reserva.request';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(
    @Body() data: ReservaRequest,
  ): Promise<Reserva> {
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
}
