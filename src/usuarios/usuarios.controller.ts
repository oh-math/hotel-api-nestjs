import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { CreateUsuarioRequest } from './dto/create.usuario.request';
import { UsuariosService } from './usuarios.service';

@Controller()
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post('usuario')
  async create(@Body() usuario: CreateUsuarioRequest){
    return this.usuariosService.create(usuario);
  }

  @Get('usuario/:id')
  async findById(@Param('id') id): Promise<Usuario> {
    return this.usuariosService.findById(id);
  }

  @Get('usuario')
  async findMany(): Promise<Usuario[]> {
    return this.usuariosService.findMany();
  }

  @Delete('usuario/:id')
  async deleteById(@Param('id') id): Promise<Usuario> {
    return this.usuariosService.deleteById(id);
  }
}
