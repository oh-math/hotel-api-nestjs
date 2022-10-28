import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { UsuarioRequest } from './dto/create.usuario.request';
import { UsuariosService } from './usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('usuario')
  async create(@Body() usuario: UsuarioRequest): Promise<Usuario> {
    return this.usuariosService.create(usuario);
  }

  @Get('usuario/:id')
  async findById(@Param('id') id: number): Promise<Usuario> {
    return this.usuariosService.findById({ id: id });
  }

  @Get('usuario')
  async findMany(): Promise<Usuario[]> {
    return this.usuariosService.findMany()
  }
}
