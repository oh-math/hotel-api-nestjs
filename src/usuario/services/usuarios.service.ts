import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { cpf } from 'cpf-cnpj-validator';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioRequest } from '../dto/create.usuario.request';
import { UsuarioResponse } from '../dto/usuario.response';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(usuario: CreateUsuarioRequest): Promise<UsuarioResponse> {
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        id: randomBytes(16),
        ...usuario,
      },
    });

    return plainToInstance(UsuarioResponse, novoUsuario)
  }

  public async findById(
    id: string
  ): Promise<UsuarioResponse> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: Buffer.from(id, 'hex')
      },
    });

    return plainToInstance(UsuarioResponse, usuario);
  }

  public async findMany(): Promise<UsuarioResponse[]>  {
    const todosUsuarios = await this.prisma.usuario.findMany();
    
    return plainToInstance(UsuarioResponse, todosUsuarios);
  }

  public async deleteById(id: string):  Promise<UsuarioResponse> {
    const usuarioDeletado = await this.prisma.usuario.delete({
      where: {
        id: Buffer.from(id, 'hex'),
      },
    });

    return plainToInstance(UsuarioResponse, usuarioDeletado)
  }
}
