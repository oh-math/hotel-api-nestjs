import { Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { NotFoundError } from '@prisma/client/runtime';
import { PrismaService } from 'src/database/PrismaService';
import { UsuarioRequest } from './dto/usuario.request';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: UsuarioRequest) {
    const usuario = await this.prisma.usuario.create({
      data,
    });
  }

  async findOne(
    usuarioUnico: Prisma.UsuarioWhereUniqueInput,
  ): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: usuarioUnico,
    });

    if (!usuario) {
      throw new NotFoundError('Usuario não encontrado');
    }

    return usuario;
  }
}
