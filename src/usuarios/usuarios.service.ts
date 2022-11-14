import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Usuario } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { cpf } from 'cpf-cnpj-validator';
import { randomBytes } from 'crypto';
import { PrismaService } from 'src/database/PrismaService';
import { CreateUsuarioRequest } from './dto/create.usuario.request';
import { UsuarioResponse } from './dto/usuario.response';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(usuario: CreateUsuarioRequest): Promise<UsuarioResponse> {
    if (!cpf.isValid(usuario.cpf)) {
      throw new HttpException('CPF inválido', HttpStatus.BAD_REQUEST);
    }
    
    const novoUsuario = await this.prisma.usuario.create({
      data: {
        id: randomBytes(16),
        ...usuario,
      },
    });

    return plainToInstance(UsuarioResponse, novoUsuario)
  }

  async findById(
    id: string
  ): Promise<Usuario> {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        id: Buffer.from(id, 'hex')
      },
    });

    this.verificaUsuario(usuario);

    return usuario;
  }

  async findMany(): Promise<Usuario[]> {
    const todosUsuarios = await this.prisma.usuario.findMany();

    if (todosUsuarios.length === 0) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    return todosUsuarios;
  }

  async deleteById(id: string) {
    const usuarioID = await this.prisma.usuario.findUnique({
      where: {
        id: Buffer.from(id, 'hex')
      }
    });

    this.verificaUsuario(usuarioID);

    return this.prisma.usuario.delete({
      where: {
        id: Buffer.from(id, 'hex'),
      },
    });
  }

  private verificaUsuario(usuario: Usuario) {
    if (!usuario)
      throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
  }
}
