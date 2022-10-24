import { Body, Controller, Post } from '@nestjs/common';
import { Quarto } from '@prisma/client';
import { QuartoRequest } from './dto/quartos.request';
import { QuartosService } from './quartos.service';

@Controller('quartos')
export class QuartosController {
  constructor(private readonly quartosService: QuartosService) {}

  @Post()
  async create(@Body() data: QuartoRequest): Promise<Quarto> {
    const { disponibilidade, numeroDoQuarto } = data;

    return this.quartosService.create({
      disponibilidade,
      numeroDoQuarto,
    });
  }
}
