import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Quarto } from '@prisma/client';
import { CreateQuartoRequest } from './dto/create.quartos.request';
import { QuartosService } from './quartos.service';

@Controller()
export class QuartosController {
  constructor(private readonly quartosService: QuartosService) {}

  @Post('quarto')
  async create(@Body() data: CreateQuartoRequest): Promise<Quarto> {
    const { numeroDoQuarto } = data;

    return this.quartosService.create({
      numeroDoQuarto,
    });
  }

  @Get('quarto/:id')
  async findByID(@Param('id') id: number): Promise<Quarto> {
    return this.quartosService.findById({ id: id });
  }

  @Put('quarto/:id')
  async updateByNumeroDoQuarto(@Param('id') id: number): Promise<Quarto> {
    return this.quartosService.updateOne({ id: id });
  }
  
  @Get('quarto')
  async findMany(): Promise<Quarto[]> {
    return this.quartosService.findMany();
  }
}
