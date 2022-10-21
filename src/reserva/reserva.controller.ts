import { Body, Controller, Param, Post } from '@nestjs/common';
import { Reserva } from '@prisma/client';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ReservaService } from './reserva.service';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(
    @Body() data: { tempoEstadia: number; reserva: string, id: number },
  ): Promise<Reserva> {
    const { tempoEstadia, reserva, id} = data;

    const dataReserva = new Date(reserva)
    return this.reservaService.create({
      tempoEstadia,
      dataReserva,
      Usuario: {
        connect: {
          id: id
        }
      }
    });
  }
}
