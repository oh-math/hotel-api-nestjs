import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Reserva } from '@prisma/client';
import { CreateReservaRequest } from './dto/create.reserva.request';
import { ReservaUpdateRequest } from './dto/update.reserva.request';
import { ReservaService } from './reserva.service';

@Controller()
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post('reserva')
  async create(@Body() reservaDTO: CreateReservaRequest) {
    return this.reservaService.create(reservaDTO);
  }

  // @Get('reserva/:id')
  // async findById(@Param('id') id: number): Promise<Reserva> {
  //   return this.reservaService.findById({ id: id });
  // }

  @Get('reserva')
  async findMany(): Promise<Reserva[]> {
    return this.reservaService.findMany();
  }

  // @Patch('reserva/:id')
  // async updateByID(
  //   @Param('id') id: number,
  //   @Body()
  //   reservaDTO: ReservaUpdateRequest,
  // ): Promise<Reserva> {
  //   reservaDTO.dataReserva = new Date(reservaDTO.dataReserva);
  //   return this.reservaService.updateById({ id: id }, reservaDTO);
  // }

  @Delete('reserva/:id')
  async deleteById(@Param('id') id: string): Promise<Reserva> {
    return this.reservaService.deleteById(id);
  }
}
