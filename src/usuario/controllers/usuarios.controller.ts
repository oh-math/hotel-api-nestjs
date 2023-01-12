import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { Usuario } from '@prisma/client';
import { CreateUsuarioRequest } from '../dto/create.usuario.request';
import { UsuarioResponse } from '../dto/usuario.response';
import { ValidateValidCPFPipe } from '../pipes/validate-valid-cpf.pipe';
import { UsuariosService } from '../services/usuarios.service';

@Controller({
  path: 'usuarios',
})
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  public async create(
    @Body(ValidateValidCPFPipe) usuario: CreateUsuarioRequest,
  ): Promise<UsuarioResponse> {
    return this.usuariosService.create(usuario);
  }

  @Get(':id')
  public async findById(@Param('id') id): Promise<UsuarioResponse>  {
    return this.usuariosService.findById(id);
  }

  @Get()
  public async findMany(): Promise<UsuarioResponse[]> {
    return this.usuariosService.findMany();
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteById(@Param('id') id):Promise<UsuarioResponse>  {
    return this.usuariosService.deleteById(id);
  }
}
