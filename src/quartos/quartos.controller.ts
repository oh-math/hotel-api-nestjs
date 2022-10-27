import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Quarto } from '@prisma/client';
import { CreateQuartoRequest } from './dto/create.quartos.request';
import { QuartosService } from './quartos.service';

@Controller('quartos')
export class QuartosController {
  constructor(private readonly quartosService: QuartosService) {}

  @Post()
  async create(@Body() data: CreateQuartoRequest): Promise<Quarto> {
    const { disponibilidade, numeroDoQuarto } = data;

    return this.quartosService.create({
      disponibilidade,
      numeroDoQuarto,
    });
  }

  @Get(':id')
  async findByID(@Param('id') id: string): Promise<Quarto> {
    return this.quartosService.findOne({ id: Number(id) });
  }

  @Get()
  async findMany(): Promise<Quarto[]> {
    return this.quartosService.findMany();
  }

  @Put(':id')
  async updateByNumeroDoQuarto(@Param('id') id: string): Promise<Quarto> {
    return this.quartosService.updateOne({id: Number(id)});
  }
}
