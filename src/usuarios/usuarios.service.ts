import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { cpf } from 'cpf-cnpj-validator';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuario: Prisma.UsuarioCreateInput) {
    if (!cpf.isValid(usuario.cpf)) {
      throw new HttpException('CPF inválido', HttpStatus.BAD_REQUEST);
    }
    return this.prisma.usuario.create({
      data: usuario,
    });
  }

  async findById(
    usuarioUnico: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: usuarioUnico,
    });

    if (!usuario) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

  async findMany(): Promise<Usuario[]> {
    const todosUsuarios = await this.prisma.usuario.findMany();

    if (todosUsuarios.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return todosUsuarios;
  }

  async deleteById(usuario: Prisma.UsuarioWhereUniqueInput): Promise<Usuario> {
    const usuarioID = await this.prisma.usuario.findUnique({
      where: usuario,
    });

    if (!usuarioID) {
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return this.prisma.usuario.delete({
      where: {
        id: usuario.id,
      },
    });
  }
}
