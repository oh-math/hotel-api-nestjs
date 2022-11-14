import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Quarto } from '@prisma/client';
import { CreateQuartoRequest } from './dto/create.quartos.request';
import { QuartosService } from './quartos.service';

@Controller()
export class QuartosController {
  constructor(private readonly quartosService: QuartosService) {}

  @Post('quarto')
  async create(@Body() quarto: CreateQuartoRequest) {
    return this.quartosService.create(quarto);
  }

  // @Get('quarto/:id')
  // async findByID(@Param('id') id: number): Promise<Quarto> {
  //   return this.quartosService.findById({ id: id });
  // }

  @Get('quarto')
  async findMany(): Promise<Quarto[]> {
    return this.quartosService.findMany();
  }

  @Patch('quarto/:numeroDoQuarto')
  async updateByNumeroDoQuarto(
    @Param('numeroDoQuarto') numeroDoQuarto: number,
  ): Promise<Quarto> {
    return this.quartosService.updateOne({ numeroDoQuarto: numeroDoQuarto });
  }

  // @Delete('quarto/:id')
  // async deleteByID(@Param('id') id: number): Promise<Quarto> {
  //   return this.quartosService.deleteById({ id: id });
  // }
}
