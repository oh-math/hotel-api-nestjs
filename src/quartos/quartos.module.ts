import { Module } from '@nestjs/common';
import { QuartosService } from './quartos.service';
import { QuartosController } from './quartos.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [QuartosController],
  providers: [QuartosService, PrismaService],
})
export class QuartosModule {}
