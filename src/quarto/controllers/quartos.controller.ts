import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Quarto } from '@prisma/client';
import { CreateQuartoRequest } from '../dto/create.quartos.request';
import { QuartoResponse } from '../dto/quarto.response';
import { QuartosService } from '../services/quartos.service';

@Controller({
  path: 'quartos',
})
export class QuartosController {
  constructor(private readonly quartosService: QuartosService) {}

  @Post()
  public async create(@Body() quarto: CreateQuartoRequest) {
    return this.quartosService.create(quarto);
  }

  @Get(':id')
  public async findByID(@Param('id') id: string): Promise<QuartoResponse> {
    return this.quartosService.findById(id);
  }

  @Get()
  public async findMany(): Promise<QuartoResponse[]> {
    return this.quartosService.findMany();
  }

  @Patch(':numeroDoQuarto')
  public async updateByNumeroDoQuarto(
    @Param('numeroDoQuarto') numeroDoQuarto: number,
  ): Promise<QuartoResponse> {
    return this.quartosService.updateOne(numeroDoQuarto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteByID(@Param('id') id: string) {
    return this.quartosService.deleteById(id);
  }
}
