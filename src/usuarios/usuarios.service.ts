import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { cpf } from 'cpf-cnpj-validator';
import { PrismaService } from 'src/database/PrismaService';
import { UsuarioRequest } from './dto/create.usuario.request';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UsuarioRequest) {
    if (!cpf.isValid(data.cpf)) {
      throw new HttpException('CPF inválido', HttpStatus.BAD_REQUEST);
    }

    return await this.prisma.usuario.create({
      data,
    });
  }

  async getById(
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
}
