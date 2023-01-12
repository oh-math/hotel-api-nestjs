import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { CreateReservaRequest } from '../dto/create.reserva.request';
import { ReservaResponse } from '../dto/reserva.response';
import { UpdateReservaRequest } from '../dto/update.reserva.request';
import { ValidateDataReservaPipe } from '../pipes/validate-data-reserva.pipe';
import { ReservaService } from '../services/reserva.service';
@Controller({
  path: 'reservas'
})
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async create(@Body(ValidateDataReservaPipe) reservaDTO: CreateReservaRequest) {
    return this.reservaService.create(reservaDTO);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<ReservaResponse> {
    return this.reservaService.findById(id);
  }

  @Get()
  async findMany(): Promise<ReservaResponse[]> {
    return this.reservaService.findMany();
  }

  @Patch(':id')
  async updateByID(
    @Param('id') id: string,
    @Body()
    reservaDTO: UpdateReservaRequest,
  ): Promise<ReservaResponse> {
    return this.reservaService.updateById(id, reservaDTO);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<ReservaResponse> {
    return this.reservaService.deleteById(id);
  }
}
