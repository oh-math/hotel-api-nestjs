import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioRequest } from './dto/usuario.request';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() data: UsuarioRequest) {
    return this.usuariosService.create(data);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Usuario> {
    return this.usuariosService.findOne({ id: Number(id) });
  }
}
