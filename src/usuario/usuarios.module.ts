import { Module } from '@nestjs/common';
import { UsuariosController } from './controllers/usuarios.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UsuariosService } from './services/usuarios.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService, PrismaService],
})
export class UsuariosModule {}
