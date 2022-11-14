import {
  Body,
  Controller,
  Delete,
  Get,
  Param, Post
} from '@nestjs/common';
import { CreateReservaRequest } from './dto/create.reserva.request';
import { ReservaResponse } from './dto/reserva.response';
import { ReservaService } from './reserva.service';

@Controller()
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post('reserva')
  async create(@Body() reservaDTO: CreateReservaRequest) {
    return this.reservaService.create(reservaDTO);
  }

  @Get('reserva/:id')
  async findById(@Param('id') id: string): Promise<ReservaResponse> {
    return this.reservaService.findById(id);
  }

  @Get('reserva')
  async findMany(): Promise<ReservaResponse[]> {
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
  async deleteById(@Param('id') id: string): Promise<ReservaResponse> {
    return this.reservaService.deleteById(id);
  }
}
